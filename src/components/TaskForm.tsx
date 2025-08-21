'use client';

import { useState } from 'react';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  const handleGenerateDescription = async () => {
    if (!title) {
      alert('Please enter a title first.');
      return;
    }
    const res = await fetch('/api/ai/generate-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (data.description) {
      setDescription(data.description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <div className="relative">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          type="button"
          onClick={handleGenerateDescription}
          className="absolute right-2 top-2 p-1 bg-gray-200 text-xs rounded"
        >
          Generate with AI
        </button>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
}