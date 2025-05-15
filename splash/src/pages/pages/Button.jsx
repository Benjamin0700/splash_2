import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

function Button() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 py-2 flex justify-around items-center">
      <Link
        to="/"
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l6-6"
          />
        </svg>
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        to="/search"
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"
          />
        </svg>
        <span className="text-xs mt-1">Search</span>
      </Link>

      <Link
        to="/saved"
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-xs mt-1">Saved</span>
      </Link>

      <Link
        to="/cart"
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 2m2-2l2-2m7-2a9.012 9.012 0 10-18 0 9.012 9.012 0 0018 0z"
          />
        </svg>
        <span className="text-xs mt-1">Cart</span>
      </Link>

      <Link
        to="/account"
        className="flex flex-col items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-xs mt-1">Account</span>
      </Link>
    </div>
  );
}

export default Button;
