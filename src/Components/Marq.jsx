/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import Marquee from "react-fast-marquee";
import BOOKS_DATA from '../data/BOOKS_DATA.json';

const Marq = () => {
  const featuredBooks = BOOKS_DATA.filter(book => book.featured);

  return (
    <div className="w-full bg-orange-600 py-3 overflow-hidden shadow-sm">
      <Marquee 
        autoFill={true}  
        gradient={false} 
        speed={50}
        direction="left"
        play={true}    
      >
        {featuredBooks.map((book) => (
          <div 
            key={book.id} 
            className="flex items-center whitespace-nowrap"
          >
            <span className="text-white font-bold px-8 text-sm uppercase tracking-widest flex items-center gap-3">
              <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
              {book.title} — ${book.price.toFixed(2)}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Marq;