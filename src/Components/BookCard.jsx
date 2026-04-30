import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book, imageSize = "w-40 h-56" }) {
  return (
    <div className="flex gap-6 group items-start bg-white p-2 rounded-xl transition-all">
      <div className={`relative ${imageSize} shrink-0 overflow-hidden rounded-lg shadow-md bg-gray-100`}>
        <Image 
          src={book.image_url} 
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, 160px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col justify-center h-full grow">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight mb-1 truncate">
          {book.title}
        </h3>
        
        <div className="flex items-center mb-1">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-lg leading-none">
                {i < book.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-2 font-semibold">
            {book.rating}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-3">by {book.author}</p>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-auto">
            <p className="text-2xl font-bold text-orange-600 mb-3 md:mb-0">
              ${book.price.toFixed(2)}
            </p>

            <Link 
              href={`/books/${book.id}`}
              className="inline-block px-5 py-2 bg-orange-600 text-white text-sm font-bold rounded shadow-sm hover:bg-orange-700 transition-all w-fit"
            >
              Details
            </Link>
        </div>
      </div>
    </div>
  );
}