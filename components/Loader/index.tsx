import React, { useEffect } from "react";

function Loader({ height }) {
	useEffect(() => {});

	return (
		<div className="w-full flex flex-row justify-center items-center h-96">
			<img src={"/static/gif3.gif"} alt="loader" className={height} />
		</div>
	);
}

export default Loader;
