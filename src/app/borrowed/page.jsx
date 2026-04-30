/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { authClient } from '@/app/lib/auth-client';

export default function MyBorrows() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      window.location.href = '/login';
    }
  }, [session, isPending]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('my_borrows') || '[]');
    setBorrowedBooks(data);
  }, []);

  const returnBook = (id) => {
    const updated = borrowedBooks.filter(book => book.id !== id);
    setBorrowedBooks(updated);
    localStorage.setItem('my_borrows', JSON.stringify(updated));
    toast.info("Book returned successfully.");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-600" />
      </div>
    );
  }

  if (!session) return null;

  if (borrowedBooks.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-400">No books borrowed yet.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-8 text-gray-900 uppercase">My Borrowed Books</h1>
      <div className="grid gap-6">
        {borrowedBooks.map((book) => (
          <div key={book.id} className="bg-white border rounded-2xl p-4 flex items-center gap-6 shadow-sm">
            <div className="relative w-20 h-28 shrink-0">
              <Image src={book.image_url} alt={book.title} fill className="object-cover rounded-lg" />
            </div>
            <div className="grow">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-500 text-sm">Borrowed on: {book.borrowedAt}</p>
            </div>
            <button 
              onClick={() => returnBook(book.id)}
              className="btn btn-outline btn-error btn-sm"
            >
              Return
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}