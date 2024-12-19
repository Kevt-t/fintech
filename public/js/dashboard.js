document.addEventListener('DOMContentLoaded', () => {
  // Fetch user data on page load
  fetch('/dashboard/data')
    .then((response) => response.json())
    .then((data) => {
      // Update balance
      document.getElementById('user-balance').textContent = `$${data.balance.toFixed(2)}`;

      // Populate transaction history
      const transactionHistory = document.getElementById('transaction-history');
      data.transactions.forEach((transaction) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${new Date(transaction.createdAt).toLocaleString()}</td>
          <td>${transaction.type}</td>
          <td>$${transaction.amount.toFixed(2)}</td>
        `;
        transactionHistory.appendChild(row);
      });
    })
    .catch((error) => console.error('Error fetching dashboard data:', error));

  // Handle investment calculator
  document.getElementById('investment-calculator').addEventListener('submit', (e) => {
    e.preventDefault();

    const capital = parseFloat(document.getElementById('capital').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseFloat(document.getElementById('time').value);

    // Compound interest formula
    const result = capital * Math.pow(1 + rate, time);
    document.getElementById('investment-result').textContent = `Future Value: $${result.toFixed(2)}`;
  });
});
