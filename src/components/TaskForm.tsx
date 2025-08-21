'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string }) => void;
  initialData?: { title: string; description: string | null };
}

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    if (!initialData) {
      setTitle('');
      setDescription('');
    }
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGenerateDescription}
          className="absolute right-2 bottom-2"
        >
          Generate with AI
        </Button>
      </div>
      <Button type="submit">{initialData ? 'Save Changes' : 'Add Task'}</Button>
    </form>
  );
}