'use client';

import { useEffect, useState } from 'react';

interface Stats {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/statistics');
        if (!res.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 my-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">Total Tasks</h3>
            <p className="text-3xl">{stats.totalTasks}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">Completed Tasks</h3>
            <p className="text-3xl">{stats.completedTasks}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">Completion Rate</h3>
            <p className="text-3xl">{stats.completionRate.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}