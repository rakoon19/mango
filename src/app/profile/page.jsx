
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/app/lib/auth-client';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) router.push('/login');
  }, [session, isPending, router]);

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-orange-600" />
    </div>
  );
  if (!session) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <button onClick={() => router.push('/')} className="mb-6 text-sm text-gray-600 hover:text-gray-900">
          ← Home
        </button>
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <div className="text-center mb-8">
          <Image 
            src={user.image || 'https://via.placeholder.com/150'} 
            alt="Profile" 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-200"
            width={120} 
            height={120} 
          />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="text-center">
          <Link href="/profile/update" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
            Update Info
          </Link>
        </div>
      </div>
    </div>
  );
}