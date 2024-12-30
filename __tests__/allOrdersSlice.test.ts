import {
  allOrderReducer,
  getAllOrders,
  getOrderByNumber,
  TAllOrders
} from '../src/slise/allOrdersSlice';

describe('проверяет редьюсер слайса allOrders', () => {
  let initialState: TAllOrders;
  beforeAll(() => {
    initialState = {
      orders: [],
      orderByNumber: null,
      error: null,
      loading: false
    };
  });

  test('обработка экшена getAllOrders.pending', () => {
    const state = allOrderReducer(initialState, {
      type: getAllOrders.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка экшена getAllOrders.fulfilled', () => {
    const moclAllOrders = {
      orders: [
        {
          _id: '6772801d750864001d376a17',
          ingredients: ['643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный бургер',
          createdAt: '2024-12-30T11:12:29.421Z',
          updatedAt: '2024-12-30T11:12:30.308Z',
          number: 64559
        },
        {
          _id: '67727f87750864001d376a16',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный spicy альфа-сахаридный бессмертный бургер',
          createdAt: '2024-12-30T11:09:59.691Z',
          updatedAt: '2024-12-30T11:10:00.642Z',
          number: 64558
        },
        {
          _id: '67727e5e750864001d376a15',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2024-12-30T11:05:02.619Z',
          updatedAt: '2024-12-30T11:05:03.638Z',
          number: 64557
        }
      ]
    };
    const state = allOrderReducer(initialState, {
      type: getAllOrders.fulfilled.type,
      payload: moclAllOrders
    });
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(moclAllOrders);
  });

  test('обработка экшена getAllOrders.rejected', () => {
    const mockError = 'Ошбика загрузки всех заказов';
    const state = allOrderReducer(initialState, {
      type: getAllOrders.rejected.type,
      error: { message: mockError }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });

  test('обработка экшена getOrderByNumber.pending', () => {
    const state = allOrderReducer(initialState, {
      type: getOrderByNumber.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка экшена getOrderByNumber.fulfilled', () => {
    const mockOrder = {
      _id: '6772801d750864001d376a17',
      ingredients: ['643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный бургер',
      createdAt: '2024-12-30T11:12:29.421Z',
      updatedAt: '2024-12-30T11:12:30.308Z',
      number: 64559
    };

    const state = allOrderReducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    });

    expect(state.loading).toBe(false);
    expect(state.orderByNumber).toEqual(mockOrder);
  });

  test('обработка экшена getOrderByNumber.rejected', () => {
    const mockError = 'Ошибка  получения заказа по номеру';
    const state = allOrderReducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: mockError }
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
