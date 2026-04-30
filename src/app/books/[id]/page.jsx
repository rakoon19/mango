'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { authClient } from '@/app/lib/auth-client';
import BOOKS_DATA from '../../../data/BOOKS_DATA.json';
import { toast } from 'react-toastify';

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();


  const handleBorrow = () => {
  const existingBorrows = JSON.parse(localStorage.getItem('my_borrows') || '[]');
  const isAlreadyBorrowed = existingBorrows.find(b => b.id === book.id);
  
  if (isAlreadyBorrowed) {
    return toast.warning("You have already borrowed this book!");
  }

    const updatedBorrows = [...existingBorrows, { 
      id: book.id,
      title: book.title,
      image_url: book.image_url,
      author: book.author,
      borrowedAt: new Date().toLocaleDateString() 
    }];
    
    localStorage.setItem('my_borrows', JSON.stringify(updatedBorrows));
    toast.success("Book borrowed successfully!");
  };

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const book = BOOKS_DATA.find((b) => b.id === parseInt(id));

  if (!book) {
    router.push('/404');
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-medium"
        >
          ← Go Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          <div className="md:w-2/5 bg-gray-100 relative min-h-100 md:min-h-auto flex items-center justify-center p-12">
            <div className="relative w-full aspect-3/4 shadow-2xl rounded-lg overflow-hidden transition-transform hover:scale-105 duration-500">
              <Image 
                src={book.image_url} 
                alt={book.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:w-3/5 p-8 md:p-16 flex flex-col justify-center">
            
            {book.featured && (
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">
                Featured Selection
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
              {book.title}
            </h1>

            <p className="text-xl text-gray-500 mb-6 font-medium">
              By <span className="text-gray-900 border-b-2 border-orange-200">{book.author}</span>
            </p>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="flex text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">
                    {i < book.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-gray-400 font-bold">({book.rating}.0 / 5.0)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-1">Price</p>
                <p className="text-4xl font-black text-orange-600">
                  ${book.price.toFixed(2)}
                </p>
              </div>

              <button className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-lg active:scale-95"
                onClick={() => {
                  toast.success("Book borrowed! Check your profile for details.");
                  handleBorrow();
                }}>
                Borrow Now
              </button>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed italic">
                {book.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}