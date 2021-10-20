import React, { useEffect, useState } from "react";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import jsonPokemons from "json-pokemon";

library.add(faSearch);

const styles = {
	control: (provided, state) => ({
		...provided,
		background: "#181b1d",
		border: "1px solid #8c8c8c",
	}),
	valueContainer: (provided, state) => ({
		// none of react-select's styles are passed to <Control />
		...provided,
		width: 360,
	}),
	input: (provided, state) => ({
		...provided,
		color: "#f9f9f9",
	}),
	singleValue: (provided, state) => ({
		...provided,
		color: "#f9f9f9",
	}),
};

function Search({ searchPokemonByName, searchText }) {
	const [filteredPokemons, setFilteredPokemons] = useState([...jsonPokemons]);
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		if (searchText && searchText !== "") {
			const pokemon = jsonPokemons.find(
				(pokemonItem) =>
					pokemonItem.name.toLowerCase() === searchText.toLowerCase()
			);

			if (!(pokemon && pokemon.name)) {
				setPokemon({ label: searchText, value: searchText });
			} else {
				setPokemon(pokemon);
			}
		}
	}, [searchText]);

	const handleOnSearch = (option, string) => {
		return (
			(option &&
				option.value &&
				option.value.toLowerCase().includes(string.toLowerCase())) ||
			(option &&
				option.data &&
				option.data.name &&
				option.data.name.toLowerCase().includes(string.toLowerCase()))
		);
	};

	const handleOnSelect = (item) => {
		if (item && item.__isNew__) {
			item.id = 0;
			item.name = item.label;
		}

		setPokemon(item);
		if (item) {
			searchPokemonByName(item.name);
		} else {
			searchPokemonByName("");
		}
	};

	const SearchIcon = () => {
		return <FontAwesomeIcon icon="search" color="#8c8c8c" className="w-4" />;
	};

	const DropdownIndicator = (props) => {
		return (
			<components.DropdownIndicator {...props}>
				<SearchIcon />
			</components.DropdownIndicator>
		);
	};

	return (
		<header>
			<div className="w-full flex flex-row justify-center items-center mb-8 auto-search">
				<CreatableSelect
					instanceId={"pokemon-search-select"}
					placeholder={"Search Pokemons..."}
					components={{ IndicatorSeparator: () => null, DropdownIndicator }}
					className="w-96"
					styles={styles}
					openMenuOnClick={false}
					openMenuOnFocus={false}
					value={pokemon}
					isClearable
					onChange={(item) => handleOnSelect(item)}
					options={filteredPokemons}
					filterOption={handleOnSearch}
					formatOptionLabel={(item) =>
						item.name || item.label.replace("Create", "Search")
					}
				/>
			</div>
		</header>
	);
}

export default Search;
