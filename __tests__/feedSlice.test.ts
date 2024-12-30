import { feedReducer, feedState, getFeed } from '../src/slise/feedSlice';

describe('проверяет редьюсер слайса feed', () => {
  let initialState: feedState;

  beforeEach(() => {
    initialState = {
      loading: false,
      orders: [],
      error: null as string | null,
      total: 0,
      totalToday: 0
    };
  });

  test('обработка экшена getFeed.pending', () => {
    const state = feedReducer(initialState, { type: getFeed.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('обработка экшена getFeed.fulfilled', () => {
    const mockFeed = {
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
      ],
      total: 20,
      totalToday: 5
    };
    const state = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: mockFeed
    });

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockFeed.orders);
    expect(state.total).toEqual(mockFeed.total);
    expect(state.totalToday).toEqual(mockFeed.totalToday);
  });

  test('обработка экшена getFeed.rejected', () => {
    const mockError = 'Ошибка в получении ленты заказов';
    const state = feedReducer(initialState, {
      type: getFeed.rejected.type,
      error: { message: mockError }
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
