import React, { Component } from "react";

interface ValueProps {
	pokemon: any;
	id: string;
}

interface ValueState {}

class Card extends Component<ValueProps, ValueState> {
	state: ValueState = {};

	componentDidMount() {}

	render() {
		const { pokemon, id } = this.props;

		return (
			<div
				className="flex flex-col justify-start items-center bg-black bg-opacity-25 rounded-xl p-8 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-800 transform hover:scale-105 shadow-lg"
				id={id}
			>
				<div className="border-b border-gray-100 border-opacity-10 py-2">
					<img
						className="h-56"
						src={pokemon.details.sprites.other.dream_world.front_default}
						alt={pokemon.name}
					/>
				</div>
				<div className="p-4 font-sans">
					<p className="text-white text-xl antialiased tracking-widest font-semibold capitalize">
						{pokemon.name}
					</p>
				</div>
			</div>
		);
	}
}

export default Card;
