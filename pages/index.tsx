import styles from "../styles/Home.module.css";

import React, { Component } from "react";
import { connect } from "react-redux";

import HorizontalLayout from "layout/HorizontalLayout";
import Loader from "components/Loader";
import withMediaQuery from "media_query";

import { fetchPokemons, fetchPokemonByName } from "store/actions";
import Card from "components/Card";
import Search from "components/Search";
import History from "components/History/History";
import LoaderCard from "components/LoaderCard.tsx";

interface ValueProps {
	title: string;
	mediaQuery: boolean;
	error: string;
	loading: boolean;
	next: string;
	prev: string;
	offset: number;
	limit: number;
	searchText: string;
	pokemons: any;
	fetchPokemons: any;
	fetchPokemonByName: any;
}

interface ValueState {
	isDeviceMobile: boolean;
	error: string;
	loading: boolean;
	next: string;
	prev: string;
	offset: number;
	limit: number;
	searchText: string;
	pokemons: any;
	savedPokemons: any;
}

class Home extends Component<ValueProps, ValueState> {
	constructor(props) {
		super(props);
		this.state = {
			isDeviceMobile: false,
			error: "",
			loading: false,
			next: null,
			prev: null,
			offset: 0,
			limit: 25,
			searchText: "",
			pokemons: [],
			savedPokemons: [],
		};
	}

	componentDidMount() {
		const { offset, limit } = this.state;
		const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
		this.setState({ savedPokemons });
		this.props.fetchPokemons(offset, limit);
	}

	componentDidUpdate(prevProps) {
		if (prevProps && this.props) {
			if (prevProps.loading !== this.props.loading && !this.props.loading) {
				const {
					error,
					loading,
					next,
					prev,
					offset,
					limit,
					searchText,
					pokemons,
				} = this.props;

				this.setState({
					error,
					loading,
					next,
					prev,
					offset,
					limit,
					searchText,
					pokemons,
				});

				const savedPokemons =
					JSON.parse(localStorage.getItem("pokemons")) || [];
				this.setState({ savedPokemons });
			}

			if (this.props.mediaQuery !== prevProps.mediaQuery) {
				this.setState({ isDeviceMobile: this.props.mediaQuery });
			}
		}
	}

	getMorePokemons = () => {
		const { offset, limit } = this.state;

		if (offset > 0) {
			this.setState({ loading: true });
			this.props.fetchPokemons(offset, limit);
		}
	};

	searchPokemonByName = (pokemonName) => {
		this.setState({ loading: true, pokemons: [] });

		if (pokemonName && pokemonName !== "") {
			this.props.fetchPokemonByName(pokemonName);
		} else {
			this.props.fetchPokemons(0, 25);
		}
	};

	render() {
		const { isDeviceMobile, loading, searchText, pokemons, savedPokemons } =
			this.state;

		return (
			<div className={styles.container}>
				<HorizontalLayout getMorePokemons={this.getMorePokemons}>
					<div
						className={
							isDeviceMobile
								? "layout-child-container-mobile"
								: "layout-child-container"
						}
					>
						<div className="w-full flex flex-row" data-test="pokemons">
							{(this.props.loading || loading) && pokemons.length === 0 ? (
								<div
									className="w-full flex flex-row justify-center items-center h-96"
									id="init-loader"
								>
									<Loader height="h-80" />
								</div>
							) : (
								<div className="w-full">
									<div data-test="pokemonsSearch">
										<Search
											searchPokemonByName={this.searchPokemonByName}
											searchText={searchText}
										/>
									</div>
									{savedPokemons && savedPokemons.length > 0 ? (
										<History
											pokemons={savedPokemons}
											searchPokemonByName={this.searchPokemonByName}
										/>
									) : null}
									{pokemons && pokemons.length === 0 ? (
										<div className="flex justify-center items-center">
											<img
												src={"/static/zeroState.png"}
												alt="zeroState"
												className="max-w-screen-lg"
											/>
										</div>
									) : (
										<div
											className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full"
											id="pokemons"
										>
											{pokemons &&
												pokemons.length > 0 &&
												pokemons.map((pokemon, index) => (
													<Card
														key={pokemon.details.id}
														pokemon={pokemon}
														id={`pokemon-card-${index}`}
													/>
												))}
											{(this.props.loading || loading) &&
											pokemons.length > 0 ? (
												<LoaderCard />
											) : null}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</HorizontalLayout>
			</div>
		);
	}
}

const mapStatetoProps = ({ Pokemon }) => ({
	error: Pokemon.error,
	loading: Pokemon.loading,
	next: Pokemon.next,
	prev: Pokemon.prev,
	offset: Pokemon.offset,
	limit: Pokemon.limit,
	searchText: Pokemon.searchText,
	pokemons: Pokemon.pokemons,
});

export default withMediaQuery("(max-width:1024px)")(
	connect(mapStatetoProps, { fetchPokemons, fetchPokemonByName })(Home)
);
