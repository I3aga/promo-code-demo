// Поле ввода промокода на странице оплаты.
// Строит небольшой кусок DOM: инпут, кнопку и слот под сообщение об ошибке.

const { showFieldError, clearFieldError } = require('../ui/FieldError');

function createPromoCodeField() {
  const root = document.createElement('div');
  root.className = 'promo-code-field';

  const input = document.createElement('input');
  input.className = 'promo-input';
  input.placeholder = 'Промокод';

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Применить';

  const errorSlot = document.createElement('div');
  errorSlot.className = 'field-error-slot';

  root.append(input, button, errorSlot);

  async function apply() {
    clearFieldError(errorSlot);

    try {
      const res = await fetch('/api/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: input.value }),
      });

      if (!res.ok) {
        throw new Error('promo request failed');
      }

      const data = await res.json();
      root.dataset.discount = String(data.discount);
      return data;
    } catch (e) {
    }
  }

  button.addEventListener('click', apply);

  return { root, input, button, errorSlot, apply };
}

module.exports = { createPromoCodeField };
