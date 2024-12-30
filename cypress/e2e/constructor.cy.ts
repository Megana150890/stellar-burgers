const testUrl = 'http://localhost:4000';

const testBun = `[data-cy="643d69a5c3f7b9001cfa093d"]`;
const testSauce = `[data-cy="643d69a5c3f7b9001cfa0942"]`;
const testMainIngredient = `[data-cy="643d69a5c3f7b9001cfa0948"]`;
const modal = '[data-cy=modal]';
const closeButton = '[data-cy=closeButton]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );

  cy.visit(testUrl);
});

describe('Burger constructor', () => {
  it('отображение 15 ингредиентов', () => {
    // Ждём завершения запроса на ингредиенты
    cy.wait('@ingredients');
  });

  it('добавление ингредиетов', () => {
    cy.get(testBun).contains('Добавить').click();
    cy.get('[data-cy=bun]').should('exist');

    cy.get(testSauce).contains('Добавить').click();
    cy.get('[data-cy=mainIngredients]').should('exist');

    cy.get(testMainIngredient).contains('Добавить').click();
    cy.get('[data-cy=mainIngredients]').should('exist');
  });

  describe('тест работы модальных окон', () => {
    it('открытие модального окна - детали ингредиента', () => {
      cy.get(testBun).click();
      cy.get(modal).should('exist');
    });

    it('закрытие моадльного окна на крестик', () => {
      cy.get(testBun).click();
      cy.get(modal).should('exist');
      cy.get(closeButton).click();
      cy.get(modal).should('not.exist');
    });

    it('закрытие модального окна по клику на оверлей', () => {
      cy.get(testBun).click();
      cy.get(modal).should('exist');
      cy.get('[data-cy=overlay]').click({ force: true }); //чтобы не перекрывался изображением ингредиента
      cy.get(modal).should('not.exist');
    });
  });
});

describe('тест на создание заказа', () => {
  before(() => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshToken-fake')
    );
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
  });
  after(() => {
    // Очищаем токены
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  it('создание заказа', () => {
    cy.get(testBun).contains('Добавить').click();

    cy.get(testSauce).contains('Добавить').click();

    cy.get(testMainIngredient).contains('Добавить').click();

    cy.get('[data-cy=button-order]')
      .contains('Оформить заказ')
      .click()
      .intercept('POST', 'api/orders', { fixture: 'order.json' })
      .as('order');

    cy.get('[data-cy=modal]').should('exist').contains('64480');

    cy.get(closeButton).click();
    cy.get(modal).should('not.exist');
    cy.get('[data-cy=bun]').should('have.length', 0);
    cy.get('[data-cy=mainIngredients]').should('have.length', 0);
  });
});
