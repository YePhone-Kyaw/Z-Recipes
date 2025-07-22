import { Link } from "react-router-dom";

interface PaginationProps {
  links: {
    nextPage: boolean;
    previousPage: boolean;
    currentPage: number;
    loopableLinks: { number: number }[];
  };
  page: number | string;
}

export default function Pagination({ links, page }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <Link to={`${links.previousPage ? '/?page=' + (Number(page)- 1) : '/?page=' + page}`} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-amber-600 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-all duration-200 hover:shadow-md">
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
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {links.loopableLinks.map((link) => {
          if (link.number == page) {
            return (
              <Link 
                key={link.number} 
                to={`?page=${link.number}`} 
                className="px-3 py-2 text-sm font-medium bg-amber-500 text-white rounded-lg shadow-lg transform scale-105 transition-all duration-200"
              >
                {link.number}
              </Link>
            );
          } else {
            return (
              <Link 
                key={link.number} 
                to={`?page=${link.number}`} 
                className="px-3 py-2 text-sm font-medium text-amber-600 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-all duration-200 hover:shadow-md"
              >
                {link.number}
              </Link>
            );
          }
        })}
      </div>

      {/* Next Button */}
      <Link to={`${links.nextPage ? '/?page=' + (Number(page) + 1 ): '/?page=' + page}`} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-amber-600 bg-white border border-amber-300 rounded-lg hover:bg-amber-50 transition-all duration-200 hover:shadow-md">
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
      </Link>
    </div>
  );
}
