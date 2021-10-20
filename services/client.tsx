import axios from "axios";
import { BASE_API_URL, REFRESH_TOKEN_URL } from "../constants/urls";

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

const client = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		Accept: "application/json",
	},
});

const request = (hasAuth, method, options) => {
	let token = localStorage.getItem("jwtToken");
	if (hasAuth && token && token !== "") {
		return client.request({
			method,
			headers: {
				Authorization: `Bearer ${token}`,
			},
			...options,
		});
	} else if (!hasAuth) {
		return client.request({
			method,
			headers: {
				Authorization: null,
			},
			...options,
		});
	}
};

export default request;

// Intercept all request
client.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		console.log("******ERROR", error);

		return Promise.reject(error);
	}
);

client.interceptors.response.use(
	async (response) => {
		return response;
	},
	(error) => {
		const errorResponse = error.response;

		console.log("******ERROR RESPONSE", errorResponse);
		if (isTokenExpiredError(errorResponse)) {
			return resetTokenAndReattemptRequest(error);
		}
		if (isTokenInvalid(errorResponse)) {
			console.log("Invalid Token");
			// logout('You have been logged out, please login again!');
			return;
		}

		// If the error is due to other reasons, we just throw it back to axios
		// store.dispatch(setAlert(errorResponse.data.detail || errorResponse.data.message, 'error', 5000));
		return Promise.reject(error);
	}
);

const isTokenExpiredError = (errorResponse) => {
	if (errorResponse && errorResponse.status) {
		const errorMessage =
			errorResponse.data.messages && errorResponse.data.messages[0];
		return (
			(errorResponse.status === 403 || errorResponse.status === 401) &&
			errorMessage &&
			errorMessage.token_class === "AccessToken" &&
			errorMessage.message === "Token is invalid or expired"
		);
	}
};

const isTokenInvalid = (errorResponse) => {
	return (
		errorResponse.status === 403 &&
		errorResponse.data.message === "TOKEN_INVALID"
	);
};

function onAccessTokenFetched(accessToken) {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
	subscribers.forEach((callback) => callback(accessToken));
	subscribers = [];
}

function addSubscriber(callback) {
	subscribers.push(callback);
}

const resetTokenAndReattemptRequest = async (error) => {
	try {
		const { response: errorResponse } = error;
		const refreshToken = localStorage.getItem("refreshToken");
		const currentAccessToken = localStorage.getItem("jwtToken");

		if (!refreshToken || !currentAccessToken) {
			// store.dispatch(logout('You have been logged out, please login again!'));
			return Promise.reject(error);
		}
		/* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */

		const retryOriginalRequest = new Promise((resolve) => {
			/* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
			addSubscriber((accessToken) => {
				errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
				resolve(axios(errorResponse.config));
			});
		});
		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true;
			const response = await axios({
				method: "post",
				url: BASE_API_URL + REFRESH_TOKEN_URL,
				data: {
					refresh: refreshToken,
				},
			});
			if (!response.data) {
				// store.dispatch(logout('You have been logged out, please login again!'));
				return Promise.reject(error);
			}

			const newAccessToken = response.data.access;

			isAlreadyFetchingAccessToken = false;
			localStorage.setItem("jwtToken", newAccessToken);
			localStorage.setItem("refreshToken", refreshToken);
			onAccessTokenFetched(newAccessToken);
		}
		return retryOriginalRequest;
	} catch (err) {
		// store.dispatch(logout('You have been logged out, please login again!'));
		return Promise.reject(err);
	}
};
