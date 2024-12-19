document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
  
    fetch('/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.getElementById('transaction-message').textContent = data.error;
        } else {
          document.getElementById('transaction-message').textContent = 'Transaction successful!';
          // Update balance and transaction history dynamically
          document.getElementById('user-balance').textContent = `$${data.balance.toFixed(2)}`;
          const transactionHistory = document.getElementById('transaction-history');
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${new Date().toLocaleString()}</td>
            <td>${type}</td>
            <td>$${amount.toFixed(2)}</td>
          `;
          transactionHistory.prepend(row);
        }
      })
      .catch((error) => console.error('Error posting transaction:', error));
  });
  