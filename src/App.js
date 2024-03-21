import React, { useState } from 'react';
import './App.css';
import logo from './logoo.jpg'; // ปรับเปลี่ยนเส้นทางตามที่ตั้งของไฟล์โลโก้ของคุณ

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [editingId, setEditingId] = useState(null);

  const addOrEditTransaction = (e) => {
    e.preventDefault();
    if (editingId) {
      // แก้ไขรายการ
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === editingId
            ? { ...transaction, title, amount: +amount, type }
            : transaction
        )
      );
      setEditingId(null);
    } else {
      // เพิ่มรายการ
      const newTransaction = {
        id: Math.random().toString(),
        title,
        amount: +amount,
        type,
      };
      setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    }
    setTitle('');
    setAmount('');
    setType('expense');
  };

  const deleteTransaction = (id) => {
    setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
  };

  const startEditTransaction = (id) => {
    const transaction = transactions.find((transaction) => transaction.id === id);
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setType(transaction.type);
    setEditingId(transaction.id);
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="App">
        <img src={logo} alt="https://i.pinimg.com/564x/7d/2b/01/7d2b0186298ebe3fd6758b245d0a53fc.jpg" style={{ width: '100px', height: '100px', margin: '0 auto', display: 'block' }} />
      <h2>ระบบรายรับรายจ่ายในชีวิตประจำวัน</h2>

      <form onSubmit={addOrEditTransaction}>
        <div>
          <label htmlFor="title">รายการ</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">จำนวนเงิน</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">ประเภท</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">รายจ่าย</option>
            <option value="income">รายรับ</option>
          </select>
        </div>
        <button type="submit">{editingId ? 'แก้ไข' : 'เพิ่มรายการ'}</button>
      </form>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.title} - {transaction.amount} บาท ({transaction.type === 'expense' ? 'รายจ่าย' : 'รายรับ'})
            <button onClick={() => startEditTransaction(transaction.id)}>แก้ไข</button>
            <button onClick={() => deleteTransaction(transaction.id)}>ลบ</button>
          </li>
        ))}
      </ul>
      <h2>รวมยอดรายรับ: {totalIncome} บาท</h2>
      <h2>รวมยอดรายจ่าย: {totalExpense} บาท</h2>
    </div>
  );
}

export default App;
