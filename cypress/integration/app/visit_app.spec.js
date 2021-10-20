describe("Opening the web app", () => {
	it("#Test 1: Visit the app", () => {
		cy.visit("/");
		cy.get("[data-test=pokemons]", { timeout: 10000 }).should("be.visible");
		cy.get("[data-test=pokemonsSearch]", { timeout: 10000 }).should(
			"be.visible"
		);
	});
	it("#Test 2: Testing Infinite Scroll", () => {
		cy.get("[data-test=pokemonsSearch]", { timeout: 10000 })
			.should("be.visible")
			.then(() =>
				cy
					.get("#main-layout", { timeout: 10000 })
					.should("be.visible")
					.then(() =>
						cy.get("#main-layout", { timeout: 10000 }).scrollTo("bottom")
					)
			);
	});
	it("#Test 3: Going to top after scroll data loads", () => {
		cy.wait(8000);
		cy.get("#init-loader", { timeout: 10000 }).should("not.exist");
		cy.get("#main-layout", { timeout: 10000 })
			.should("be.visible")
			.then(() => cy.get("#main-layout", { timeout: 10000 }).scrollTo("top"));
	});
	it("#Test 4: Searching for a pokemon", () => {
		cy.get(".pokedex-search__input")
			.focus()
			.type("Pikachu", "{enter}{enter}", { force: true })
			.then(() =>
				cy
					.get(".pokedex-search__option")
					.eq(1)
					.contains("Pikachu")
					.click({ force: true })
			);
		cy.get(".pokedex-search__single-value ", { timeout: 10000 })
			.should("be.visible")
			.contains("Pikachu");
	});
	it("#Test 5: Clearing Search", () => {
		cy.wait(8000);
		cy.get(".pokedex-search__clear-indicator").click();
		cy.get(".pokedex-search__input", { timeout: 10000 })
			.should("be.visible")
			.should("have.value", "");
	});
	it("#Test 5: Searching random pokemon not to be found", () => {
		cy.get(".pokedex-search__input", { timeout: 10000 }).should("be.visible");
		cy.get(".pokedex-search__input")
			.focus()
			.type("Random", "{enter}{enter}", { force: true })
			.then(() =>
				cy
					.get(".pokedex-search__option--is-focused", { timeout: 10000 })
					.should("be.visible")
					.contains("Random")
					.click({ force: true })
			);
		cy.get("#pokemon-zero-state", { timeout: 10000 }).should("be.visible");
		cy.get(".pokedex-search__single-value", { timeout: 10000 })
			.should("be.visible")
			.contains("Random");
	});
	it("#Test 5: Clearing Random Pokemon", () => {
		cy.wait(8000);
		cy.get(".pokedex-search__clear-indicator").should("be.visible").click();
		cy.get(".pokedex-search__input", { timeout: 10000 })
			.should("be.visible")
			.should("have.value", "");
	});
});
