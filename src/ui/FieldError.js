// Готовый вспомогательный компонент: показывает и убирает
// сообщение об ошибке под полем ввода. Devin должен переиспользовать его,
// а не изобретать свой.

function showFieldError(slot, message) {
  slot.textContent = message;
  slot.setAttribute('role', 'alert');
}

function clearFieldError(slot) {
  slot.textContent = '';
  slot.removeAttribute('role');
}

module.exports = { showFieldError, clearFieldError };