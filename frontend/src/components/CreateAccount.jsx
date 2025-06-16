import React, { useState } from 'react';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, balance: parseFloat(balance) }),
    });
    const data = await res.json();
    if (data.id) {
      setMsg(`Account created (ID: ${data.id})`);
      setName('');
      setBalance('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl mb-2">Create Account</h2>
      <input type="text" placeholder="Name" value={name}
             onChange={e => setName(e.target.value)}
             className="block w-full mb-2 p-2 border" required />
      <input type="number" placeholder="Initial Balance" value={balance}
             onChange={e => setBalance(e.target.value)}
             className="block w-full mb-2 p-2 border" required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Create</button>
      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </form>
  );
}
