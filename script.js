const transactions = [];

const quantityInput = document.getElementById('quantity');
const priceInput = document.getElementById('price');
const addTransactionButton = document.getElementById('add-transaction');
const resetTransactionsButton = document.getElementById('reset-transactions');
const transactionsList = document.getElementById('transactions-list');
const averagePriceDisplay = document.getElementById('average-price');

addTransactionButton.addEventListener('click', () => {
  const quantity = parseFloat(quantityInput.value);
  const price = parseFloat(priceInput.value);

  if (isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
    alert('Please enter valid quantity and price.');
    return;
  }

  const transaction = { quantity, price };
  transactions.push(transaction);

  // Clear inputs
  quantityInput.value = '';
  priceInput.value = '';

  // Update UI
  updateTransactionsList();
  updateAveragePrice();
});

resetTransactionsButton.addEventListener('click', () => {
  transactions.length = 0; // Clear all transactions
  updateTransactionsList();
  updateAveragePrice();
});

function updateTransactionsList() {
  if (transactions.length === 0) {
    transactionsList.innerHTML = '<li class="empty-state">No transactions added yet.</li>';
    return;
  }

  transactionsList.innerHTML = transactions
    .map(
      (t, index) => `
      <li>
        <span>${t.quantity} shares at ${t.price.toFixed(2)} each</span>
        <button onclick="removeTransaction(${index})">Remove</button>
      </li>
    `
    )
    .join('');
}

function updateAveragePrice() {
  if (transactions.length === 0) {
    averagePriceDisplay.textContent = '0.00';
    return;
  }

  const totalQuantity = transactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalCost = transactions.reduce((sum, t) => sum + t.quantity * t.price, 0);
  const averagePrice = (totalCost / totalQuantity).toFixed(2);

  averagePriceDisplay.textContent = averagePrice;
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateTransactionsList();
  updateAveragePrice();
}
