import React, { useState } from 'react';

export default function TransferForm() {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  async function handleTransfer(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/transfer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_id: parseInt(fromId),
        to_id: parseInt(toId),
        amount: parseFloat(amount)
      }),
    });
    const data = await res.json();
    if (data.id) setMsg('Transfer successful!');
    else setMsg(`Error: ${data.error}`);
  }

  return (
    <form onSubmit={handleTransfer} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">Transfer Money</h2>
      <input type="number" placeholder="From Account ID" value={fromId}
             onChange={e => setFromId(e.target.value)}
             className="block w-full mb-2 p-2 border" required />
      <input type="number" placeholder="To Account ID" value={toId}
             onChange={e => setToId(e.target.value)}
             className="block w-full mb-2 p-2 border" required />
      <input type="number" placeholder="Amount" value={amount}
             onChange={e => setAmount(e.target.value)}
             className="block w-full mb-2 p-2 border" required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Transfer</button>
      {msg && <p className="mt-2 text-blue-600">{msg}</p>}
    </form>
  );
}
