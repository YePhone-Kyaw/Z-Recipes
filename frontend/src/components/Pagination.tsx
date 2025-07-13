import { Link } from "react-router-dom";

interface PaginationProps {
  links: {
    nextPage: boolean;
    previousPage: boolean;
    currentPage: number;
    loopableLinks: { number: number }[];
  };
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-pink-600 bg-white border border-pink-300 rounded-lg hover:bg-pink-50 transition-all duration-200 hover:shadow-md">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {links.loopableLinks.map((link) => {
          if (links.currentPage === link.number) {
            return (
              <Link 
                key={link.number} 
                to={`?page=${link.number}`} 
                className="px-3 py-2 text-sm font-medium bg-pink-500 text-white rounded-lg shadow-lg transform scale-105 transition-all duration-200"
              >
                {link.number}
              </Link>
            );
          } else {
            return (
              <Link 
                key={link.number} 
                to={`?page=${link.number}`} 
                className="px-3 py-2 text-sm font-medium text-pink-600 bg-white border border-pink-300 rounded-lg hover:bg-pink-50 transition-all duration-200 hover:shadow-md"
              >
                {link.number}
              </Link>
            );
          }
        })}
      </div>

      {/* Next Button */}
      <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-pink-600 bg-white border border-pink-300 rounded-lg hover:bg-pink-50 transition-all duration-200 hover:shadow-md">
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
