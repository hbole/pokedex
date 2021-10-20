import React, { Component } from "react";

interface ValueProps {
	pokemons: any;
	searchPokemonByName: any;
}

interface ValueState {}

class History extends Component<ValueProps, ValueState> {
	state: ValueState = {};

	componentDidMount() {}

	render() {
		const { pokemons, searchPokemonByName } = this.props;

		return (
			<div className="flex flex-row justify-start items-center my-12">
				<p className="font-sans font-semibold text-xl text-gray-100">
					Your recent searches:{" "}
				</p>
				{pokemons &&
					pokemons.map((pokemon) => (
						<p
							key={pokemon}
							className="font-sans text-green-400 mx-8 cursor-pointer hover:text-white"
							onClick={() => searchPokemonByName(pokemon)}
						>
							{pokemon}
						</p>
					))}
			</div>
		);
	}
}

export default History;
