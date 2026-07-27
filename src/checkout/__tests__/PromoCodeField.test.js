const { createPromoCodeField } = require('../PromoCodeField');

// Мок ответа fetch: fetch resolve-ится даже на 4xx, поэтому res.ok = false.
function mockFetchResponse({ ok, status, body }) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('PromoCodeField', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete global.fetch;
  });

  test('показывает ошибку при неверном промокоде (422)', async () => {
    global.fetch = jest.fn(() =>
      mockFetchResponse({ ok: false, status: 422, body: { error: 'invalid_promo' } })
    );

    const field = createPromoCodeField();
    field.input.value = 'WRONG';
    await field.apply();

    // Этот assert падает на текущем коде: слот пустой, ошибка проглочена.
    expect(field.errorSlot.textContent).toMatch(/неверный промокод/i);
  });

  test('не показывает ошибку при валидном промокоде', async () => {
    global.fetch = jest.fn(() =>
      mockFetchResponse({ ok: true, status: 200, body: { discount: 10 } })
    );

    const field = createPromoCodeField();
    field.input.value = 'SALE10';
    await field.apply();

    expect(field.errorSlot.textContent).toBe('');
    expect(field.root.dataset.discount).toBe('10');
  });
});