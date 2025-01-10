
document.getElementById('transaction-form').addEventListener('submit', async function (event) {
event.preventDefault(); // Prevent the form from refreshing the page

const amount = parseFloat(document.getElementById('amount').value);
const type = document.getElementById('type').value;

try {
// Send the transaction data to the server
const response = await fetch('/transactions', {
method: 'POST',
headers: {
     'Content-Type': 'application/json',
},
body: JSON.stringify({ amount, type }),
});

if (response.ok) {
const transaction = await response.json();

// Update the balance
const balanceElement = document.getElementById('user-balance');
let currentBalance = parseFloat(balanceElement.textContent);
let newBalance = currentBalance;

if (type === 'deposit') {
    newBalance += amount;
    // Add highlight for positive change
    balanceElement.classList.add('balance-highlight-positive');
} else if (type === 'withdraw' || type === 'expense') {
    newBalance -= amount;
    // Add highlight for negative change
    balanceElement.classList.add('balance-highlight-negative');
}

balanceElement.textContent = newBalance.toFixed(2);

// Remove the highlight after a short delay
setTimeout(() => {
    balanceElement.classList.remove('balance-highlight-positive', 'balance-highlight-negative');
}, 1000); // 1 second delay

    // Add the new transaction to the history table
    const historyBody = document.getElementById('transaction-history-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${new Date(transaction.createdAt).toLocaleString()}</td>
    `;
    historyBody.prepend(newRow);

    // Reset the form
    document.getElementById('transaction-form').reset();
    } else {
       alert('Failed to add transaction. Please try again.');
    }
} catch (error) {
     console.error('Error submitting transaction:', error);
     alert('An error occurred. Please try again later.');
}
});