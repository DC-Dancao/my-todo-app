'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    <Card>
      <CardHeader>
        <CardTitle>Import / Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="import-file">Import from CSV</label>
          <div className="flex gap-2">
            <Input id="import-file" type="file" onChange={handleFileChange} />
            <Button onClick={handleImport}>Import</Button>
          </div>
        </div>
        <div className="space-y-2">
          <label>Export to CSV</label>
          <Button onClick={handleExport} className="w-full">
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}