'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookCafeBanner() {
  const [showContent, setShowContent] = useState(true);

  return (
    <div className="relative w-full h-137.5 bg-stone-900 overflow-hidden flex items-center">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-orange-900/20 to-transparent" />
        <div className="absolute inset-0 opacity-10 border-b border-orange-200/20 h-10 w-full" />
      </div>

      <div className={`relative z-20 px-10 lg:px-24 transition-all duration-700 
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        
        <span className="bg-orange-900/30 text-orange-400 border border-orange-900 px-3 py-1 rounded-full text-xs font-semibold">
          NEW COLLECTION 2024
        </span>

        <h1 className="text-6xl font-bold text-stone-100 mt-6 mb-4">
          Find Your <br />
          <span className="text-orange-500">Next Great Read</span>
        </h1>

        <p className="text-stone-400 text-lg max-w-md mb-8">
          Explore our curated selection of fresh coffee and even fresher stories. 
          Your perfect reading nook is waiting.
        </p>

        <div className="flex gap-4">
          <Link href="/books" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md font-bold transition">
            Browse All Books
          </Link>
          <Link href="/featured" className="border border-stone-500 text-stone-300 hover:bg-stone-800 px-8 py-3 rounded-md transition">
            Bestsellers
          </Link>
        </div>
      </div>

      <div className={`absolute bottom-10 right-10 z-20 transition-all duration-1000 delay-300
        ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        <div className="bg-stone-800/80 p-5 rounded-lg border border-stone-700 text-right">
          <div className="flex justify-end -space-x-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-stone-900 flex items-center justify-center text-[10px] text-white">JD</div>
            <div className="w-8 h-8 rounded-full bg-green-600 border border-stone-900 flex items-center justify-center text-[10px] text-white">MK</div>
            <div className="w-8 h-8 rounded-full bg-orange-600 border border-stone-900 flex items-center justify-center text-[10px] text-white">LS</div>
            <div className="w-8 h-8 rounded-full bg-stone-600 border border-stone-900 flex items-center justify-center text-[10px] text-white">+</div>
          </div>
          
          <div className="text-yellow-500 text-sm">★★★★★</div>
          <p className="text-stone-400 text-xs mt-1 font-medium uppercase">
            Join 4,000+ Happy Readers
          </p>
        </div>
      </div>

      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-orange-600/10 blur-3xl rounded-full" />
    </div>
  );
}