/* globals Cypress, cy, describe, beforeEach */

describe('Keylani UI tests', () => {
	beforeEach('Visit page', () => {
		cy.log(Cypress.env('dev').Msg);
		cy.visit(Cypress.env('dev').BaseUrl);
		cy.reload(true);
	});
});
