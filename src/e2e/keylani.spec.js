/* globals Cypress, cy, describe, it, beforeEach */

describe('Keylani UI tests', () => {
	beforeEach('Visit page', () => {
		cy.log(Cypress.env('dev').Msg);
		cy.visit(Cypress.env('dev').BaseUrl);
		cy.reload(true);
	});

	it('should test a key press', () => {
		cy.get('body').type('a')
			.find('.keylani-binding');
	});
});
