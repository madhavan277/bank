import React from 'react';
import AccountList from './components/AccountList';
import CreateAccount from './components/CreateAccount';
import TransferForm from './components/TransferForm';

export default function App() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Banking App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <AccountList />
          <CreateAccount />
        </div>
        <TransferForm />
      </div>
    </div>
  );
}
