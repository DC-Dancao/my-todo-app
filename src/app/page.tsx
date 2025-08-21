'use client';

'use client';

import Dashboard from '@/components/Dashboard';
import ImportExport from '@/components/ImportExport';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { useState } from 'react';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const handleAddTask = async (task: { title: string; description: string }) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    setRefresh(!refresh);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-24">
      <h1 className="text-4xl font-bold mb-8">My Todo List</h1>
      <div className="w-full max-w-md">
        <ImportExport />
        <Dashboard key={`dashboard-${refresh.toString()}`} />
        <TaskForm onSubmit={handleAddTask} />
        <TaskList key={`tasklist-${refresh.toString()}`} />
      </div>
    </main>
  );
}