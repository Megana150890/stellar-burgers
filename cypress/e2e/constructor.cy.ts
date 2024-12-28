const testBun = '643d69a5c3f7b9001cfa093d';
const testSauce = '643d69a5c3f7b9001cfa0942';
const testMainIngredient = '643d69a5c3f7b9001cfa0948';
beforeEach(() => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('refreshToken', 'mockRefreshToken');
  //   });
  //   cy.setCookie('accessToken', 'mockAccessToken');

  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  //   cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
  cy.visit('http://localhost:4000');
});

// afterEach(() => {
//   // Очищаем токены
//   cy.window().then((win) => {
//     win.localStorage.removeItem('refreshToken');
//   });
//   cy.clearCookie('accessToken');
// });

describe('Burger constructor', () => {
  it('отображение 15 ингредиентов', () => {
    // Ждём завершения запроса на ингредиенты
    cy.wait('@ingredients');
  });

  it('добавление ингредиетов', () => {
    cy.get(`[data-cy=${testBun}]`).contains('Добавить').click();
    cy.get('[data-cy=bun]').should('exist');

    cy.get(`[data-cy=${testSauce}]`).contains('Добавить').click();
    cy.get('[data-cy=mainIngredients]').should('exist');

    cy.get(`[data-cy=${testMainIngredient}]`).contains('Добавить').click();
    cy.get('[data-cy=mainIngredients]').should('exist');
  });

  describe('тест работы модальных окон', () => {
    it('открытие модального окна - детали ингредиента', () => {
      cy.get(`[data-cy=${testBun}]`).click();
      cy.get('[data-cy =modal]').should('exist');
    });

    it('закрытие моадльного окна на крестик', () => {
      cy.get(`[data-cy=${testBun}]`).click();
      cy.get('[data-cy =modal]').should('exist');
      cy.get('[data-cy=closeButton]').click();
      cy.get('[data-cy =modal]').should('not.exist');
    });

    it('закрытие модального окна по клику на оверлей', () => {
      cy.get(`[data-cy=${testBun}]`).click();
      cy.get('[data-cy =modal]').should('exist');
      cy.get('[data-cy=overlay]').click({ force: true }); //чтобы не перекрывался изображением ингредиента
      cy.get('[data-cy =modal]').should('not.exist');
    });
  });
});

describe('тест на создание заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('refreshToken-fake')
    );
    cy.setCookie('accessToken', 'mockAccessToken');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('user');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
  });
  afterEach(() => {
    // Очищаем токены
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  it('создание заказа', () => {
    cy.get(`[data-cy=${testBun}]`).contains('Добавить').click();

    cy.get(`[data-cy=${testSauce}]`).contains('Добавить').click();

    cy.get(`[data-cy=${testMainIngredient}]`).contains('Добавить').click();

    cy.get('[data-cy=button-order]')
      .contains('Оформить заказ')
      .click()
      .intercept('POST', 'api/orders', { fixture: 'order.json' })
      .as('order');
    cy.get('[data-cy=modal]').contains('64480').should('exist');
    cy.get('[data-cy=closeButton]').click();
    cy.get('[data-cy =modal]').should('not.exist');
    cy.get('[data-cy=bun]').should('have.length', 0);
    cy.get('[data-cy=mainIngredients]').should('have.length', 0);
  });
});
