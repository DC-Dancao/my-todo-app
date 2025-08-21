'use client';

import { useState } from 'react';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function EditTaskModal({ task, onClose, onSave }: EditTaskModalProps) {
  const handleSave = (updatedTask: { title: string; description: string }) => {
    onSave({ ...task, ...updatedTask });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <TaskForm onSubmit={handleSave} />
        <button onClick={onClose} className="mt-4 p-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </div>
  );
}