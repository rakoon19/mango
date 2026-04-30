import Link from 'next/link';

export default function Page404() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">This book does not exist or the link is invalid.</p>
        <Link href="/books" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
          Browse Books
        </Link>
      </div>
    </main>
  );
}
