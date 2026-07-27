

function showFieldError(slot, message) {
  slot.textContent = message;
  slot.setAttribute('role', 'alert');
}

function clearFieldError(slot) {
  slot.textContent = '';
  slot.removeAttribute('role');
}

module.exports = { showFieldError, clearFieldError };
