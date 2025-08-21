'use client';

import { useState } from 'react';

export default function ImportExport() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert('Please select a file to import.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/tasks/import', {
      method: 'POST',
      body: formData,
    });

    alert('Import complete!');
    window.location.reload(); // Refresh to see the new tasks
  };

  const handleExport = () => {
    window.location.href = '/api/tasks/export';
  };

  return (
    <div className="p-4 my-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Import / Export</h2>
      <div className="flex gap-4">
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleImport} className="p-2 bg-green-500 text-white rounded">
            Import
          </button>
        </div>
        <button onClick={handleExport} className="p-2 bg-blue-500 text-white rounded">
          Export
        </button>
      </div>
    </div>
  );
}