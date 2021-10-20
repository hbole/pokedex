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
		cy.wait(10000);
		cy.get("#init-loader", { timeout: 10000 }).should("not.exist");
		cy.get("#main-layout", { timeout: 10000 })
			.should("be.visible")
			.then(() => cy.get("#main-layout", { timeout: 10000 }).scrollTo("top"));
	});
});
