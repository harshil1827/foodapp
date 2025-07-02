import React from 'react';
import { Link } from 'react-router-dom';

function Card() {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-3">
      <Link to="/">
        <img
          className="rounded-t-lg w-full h-32 object-cover"
          src="/docs/images/blog/image-1.jpg"
          alt="Card"
        />
      </Link>
      <div className="p-3 text-center">
        <Link to="/">
          <h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            Noteworthy tech acquisitions
          </h5>
        </Link>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          Biggest tech acquisitions of 2021 in reverse chronological order.
        </p>
        <Link
          to="/cart"
          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </Link>
      </div>
    </div>
  );
}

export default Card;
