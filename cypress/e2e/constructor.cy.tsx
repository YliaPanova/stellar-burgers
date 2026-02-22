/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Должен добавить булку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('.constructor-element__text').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('Должен добавить начинку в конструктор', () => {
    cy.contains('Мясо бессмертных моллюсков')
      .closest('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('.constructor-element__text').should(
      'contain',
      'Мясо бессмертных моллюсков'
    );
  });

  it('Должен открывать модальное окно с деталями ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('Должен закрывать модальное окно по клику на крестик', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('[class*="Z7mUFPBZScxutAKTLKHN"]').click();

    cy.contains('Детали ингредиента').should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });

  it('Должен закрывать модальное окно по клику на оверлей', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('be.visible');

    cy.get('[class*="RuQycGaRTQNbnIEC5d3Y"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
    cy.url().should('eq', 'http://localhost:4000/');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.setCookie('accessToken', 'fake-access-token');
    window.localStorage.setItem('refreshToken', 'fake-refresh-token');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Должен создать заказ и показать номер', () => {
    cy.contains('Краторная булка N-200i')
      .closest('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('Мясо бессмертных моллюсков')
      .closest('li')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@createOrder');

    cy.contains('12345', { timeout: 10000 }).should('be.visible');
    cy.contains('идентификатор заказа').should('be.visible');

    cy.wait(1000);
    cy.get('body').type('{esc}');
    cy.wait(500);

    cy.get('.constructor-element__text', { timeout: 10000 }).should(
      'not.exist'
    );
  });
});
