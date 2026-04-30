'use client';
import { useState } from 'react';
import BOOKS_DATA from '../../data/BOOKS_DATA.json';
import BookCard from '@/components/BookCard';

export default function AllBooksPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS_DATA.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Explore Our Collection</h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full p-4 pl-12 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <p className="mb-8 text-gray-600 font-medium">
          Showing {filteredBooks.length} books
        </p>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} imageSize="w-32 h-44" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">No books found matching `{searchQuery}`</p>
          </div>
        )}
      </div>
    </main>
  );
}