'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
const bookdata = '/bookdata.json';
  useEffect(() => {
    fetch(bookdata) 
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load books:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 bg-white px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Books</h2>
            <p className="text-gray-500 mt-1">Our most popular reads this week.</p>
          </div>
          <Link href="/books" className="text-orange-600 font-medium hover:text-orange-700 transition">
            See All Books →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-orange-600"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div key={book.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={book.image_url} 
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-bold uppercase">
                      {book.category}
                    </span>
                    <span className="text-xs text-gray-400">Qty: {book.available_quantity}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mt-3 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-3">by {book.author}</p>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 h-10 mb-4">
                    {book.description}
                  </p>

                  <Link 
                    href={`/books/${book.id}`}
                    className="block text-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-lg transition-colors text-sm font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}