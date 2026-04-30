'use client';
import { useState } from 'react';
import Link from 'next/link';
import BOOKS_DATA from '../data/BOOKS_DATA.json'; 
import BookCard from './BookCard';

export default function FeaturedBooks() {
  const [featuredBooks] = useState(
    BOOKS_DATA.filter(book => book.featured).slice(0, 6)
  );

  return (
    <section className="py-16 bg-white px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b pb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
          <Link href="/books" className="text-orange-600 font-semibold hover:underline flex items-center gap-1">
            View All <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}