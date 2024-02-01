import { ScanOrderService } from '../../src/app/scan-order/services/scan-order.service';

describe('scan-order screen tests', () => {
  it('is connected', () => {
    cy.visit('https://vps.ronp.nl');
  });

  it('navigates to scan-order screen', () => {
    login();
    cy.get('.title').contains('Enter Productnumber:');
  });

  it('should give error when not entering anything', () => {
    login();
    cy.get('.scan-button').click();
    cy.get('.error').contains('please scan a product');
  });

  it('should give error when entering invalid productnumber', () => {
    login();
    cy.get('.scan-input').first().type('ddddd');
    cy.get('.scan-button').click();
    cy.get('.error').contains('must be a valid product number');
  });

  it('should give error when entering non existent productnumber', () => {
    login();
    cy.get('.scan-input').first().type('998899');
    cy.get('.scan-button').click();
    cy.get('.error').contains('Product not found');
  });

  it('should return existing product', () => {
    login();

    cy.get('.scan-input').first().type('998899');
    cy.get('.scan-button').click();
    cy.get('.error').contains('Product not found');
  });


});

function login() {
  cy.visit('https://vps.ronp.nl');

  cy.get('.login-form .form-group input').eq(0).type('name');
  cy.get('.login-form .form-group input').eq(1).type('admin');

  cy.get('button').click();
}
