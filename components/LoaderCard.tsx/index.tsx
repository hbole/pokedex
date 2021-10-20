import Loader from "components/Loader";
import React, { Component } from "react";

interface ValueProps {}

interface ValueState {}

class LoaderCard extends Component<ValueProps, ValueState> {
	state: ValueState = {};

	componentDidMount() {}

	render() {
		return (
			<div className="flex flex-col justify-start items-center bg-black bg-opacity-25 rounded-xl p-8 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-800 transform hover:scale-105 shadow-lg">
				<div className="border-b border-gray-100 border-opacity-10 py-2">
					<img
						className="h-56"
						src={
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlIyIQMX3CjmOfMs1gA0jsn0Qfc_7LuirIQ&usqp=CAU"
						}
						alt={"loading"}
					/>
				</div>
				<div className="p-4 font-sans">
					<p className="text-white text-xl antialiased tracking-widest font-semibold capitalize">
						Loading...
					</p>
				</div>
			</div>
		);
	}
}

export default LoaderCard;
