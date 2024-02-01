/// <reference types="cypress" />

describe('log screen tests', () => {
  it('should filter correctly on account', () => {
    navigateToLogscreen();
    filterAndClickPaginator('name', 0, 1, 1);
  });

  it('should filter correctly on product', () => {
    navigateToLogscreen();
    filterAndClickPaginator('Groen', 1, 1, 2);
  });
});

function filterAndClickPaginator(filterValue, inputIndex, buttonIndex, extraIndex) {
  cy.get('input').eq(inputIndex).type(filterValue);
  cy.get('button').eq(buttonIndex).click();

  recursiveClickPaginatorButton(filterValue, extraIndex);
}

function recursiveClickPaginatorButton(valueToCheck, extraIndex) {
  checkRowsOnCurrentPage(valueToCheck, extraIndex);
  checkPaginatorButton().then((isEnabled) => {
    if (isEnabled) {
      cy.get('.mat-mdc-paginator-navigation-next').click();
      recursiveClickPaginatorButton(valueToCheck, extraIndex);
    }
  });
}

function checkPaginatorButton() {
  return cy.get('.mat-mdc-paginator-navigation-next').then(($button) => {
    return $button.is(':enabled');
  });
}

function checkRowsOnCurrentPage(valueToCheck, extraIndex) {
  cy.get('tr').each(($row, index) => {
    if (index > 0) {
      cy.get(`td:nth-child(${extraIndex})`, { withinSubject: $row }).invoke('text').should('satisfy', (text) => text.includes(valueToCheck) || text === '');
    }
  });
}

function navigateToLogscreen() {
  login();
  cy.get('.navbar').contains('Logs').click();
}

function login() {
  cy.visit('https://vps.ronp.nl');

  cy.get('.login-form .form-group input').eq(0).type('name');
  cy.get('.login-form .form-group input').eq(1).type('admin');

  cy.get('button').click();
}
