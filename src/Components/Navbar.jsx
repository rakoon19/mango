'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const getImageSrc = () => {
    if (imgError || !user?.image) {
      const initial = user?.name?.charAt(0) || "U";
      return `https://via.placeholder.com/150?text=${encodeURIComponent(initial)}`;
    }
    return user.image;
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl font-bold text-orange-600">
          mango
        </Link>
      </div>

      <div className="flex-1 flex justify-center lg:block">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/books">All Books</Link></li>
          <li><Link href="/profile">My Profile</Link></li>
          <li><Link href="/borrowed">My Borrowed Books</Link></li>
        </ul>
      </div>

      <div className="flex-none gap-2 px-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:inline">
              {user.name}
            </span>
            
<Link href="/profile">
              <Image 
                src={getImageSrc()}
                alt="profile"
                width={40}
                height={40}
                onError={handleImageError}
                className="rounded-full border-2 border-orange-500 cursor-pointer hover:border-orange-600 transition"
              />
            </Link>
            
            <button 
              className="btn btn-xs btn-outline btn-error"
              onClick={() => authClient.signOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="btn btn-sm bg-orange-500 text-amber-50 hover:bg-orange-600">
            Login
          </Link>
        )}
      </div>

      <div className="dropdown dropdown-end lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/books">All Books</Link></li>
          <li><Link href="/profile">My Profile</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;