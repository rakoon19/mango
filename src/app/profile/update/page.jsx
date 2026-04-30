'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';

export default function UpdateProfile() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) window.location.href = '/login';
    else if (session) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(session.user.name || '');
      setImage(session.user.image || '');
    }
  }, [session, isPending]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({ name, image });
      toast.success('Profile updated!');
      window.location.href = '/profile';
    } catch {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-orange-600" />
    </div>
  );
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Info'}
          </button>
        </form>
        <Link href="/profile" className="block w-full mt-4 text-center text-gray-600 hover:text-gray-900">Cancel</Link>
      </div>
    </div>
  );
}