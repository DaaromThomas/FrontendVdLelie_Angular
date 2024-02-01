describe('scan-order screen tests', () => {

  beforeEach(() => {
    login();
  });
  it('is connected', () => {
    cy.visit('https://vps.ronp.nl');
  });

  it('navigates to scan-order screen', () => {
    cy.get('.title').contains('Enter Productnumber:');
  });

  it('should give error when not entering anything', () => {
    cy.get('.scan-button').click();
    cy.get('.error').contains('please scan a product');
  });

  it('should give error when entering invalid productnumber', () => {
    cy.get('.scan-input').first().type('ddddd');
    cy.get('.scan-button').click();
    cy.get('.error').contains('must be a valid product number');
  });

  it('should give error when entering non existent productnumber', () => {
    cy.get('.scan-input').first().type('998899');
    cy.get('.scan-button').click();
    cy.get('.error').contains('Product not found');
  });

  it('should navigate to filter by customer', () => {
    cy.get('.scan-input').first().type('ddddd');
    cy.get('.FilterByCustomerButton').click();
    cy.get('h2').contains('Customer List');
  });

});

function login() {
  cy.visit('http://localhost:4200/');

  cy.get('.login-form .form-group input').eq(0).type('name');
  cy.get('.login-form .form-group input').eq(1).type('admin');

  cy.get('button').click();
}
