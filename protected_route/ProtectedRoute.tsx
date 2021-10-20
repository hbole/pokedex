import React, { Component } from "react";
import Router from "next/router";

interface ValueState {
	isUserAuthenticated: boolean;
}

class ProtectedRoute extends Component {
	state: ValueState = {
		isUserAuthenticated: false,
	};

	componentDidMount() {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user && user.id) {
			this.setState({ isUserAuthenticated: true });
		} else {
			this.redirectToLogin();
		}
	}

	redirectToLogin() {
		// Route to login
	}

	render() {
		let { children } = this.props;

		return (
			<div>{this.state.isUserAuthenticated ? <div>{children}</div> : null}</div>
		);
	}
}

export default ProtectedRoute;
