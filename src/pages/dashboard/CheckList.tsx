import React, { useState } from 'react';

const CheckList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Inspect equipment', completed: false },
    { id: 2, text: 'Check fuel levels', completed: false },
    { id: 3, text: 'Review safety protocols', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim() === '') return;
    setItems([
      ...items,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput('');
  };

  const toggleComplete = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Check List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add new item..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
          onClick={addItem}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex items-center bg-white rounded shadow p-3">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
              className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
            <button
              className="ml-3 text-red-500 hover:text-red-700"
              onClick={() => deleteItem(item.id)}
              title="Delete"
            >
              &#10005;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckList; 