import React, { useEffect, useState } from 'react';

export default function AccountList() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/accounts')
      .then(res => res.json())
      .then(setAccounts);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Accounts</h2>
      <ul>
        {accounts.map(acc => (
          <li key={acc.id} className="bg-white p-4 rounded shadow mb-2">
            {acc.name}: ₹{acc.balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
