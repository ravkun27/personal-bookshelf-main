import React from "react";
import { useEffect, useState } from "react";
import fallbackUrl from "../assets/img-404.jpg";
import { BookLoader } from "react-awesome-loaders";

const Cards = ({results}) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!results) return;

    const fetchBooks = async () => {
      setError(false);
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${results}&limit=10&page=1`
        );
        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [results]);
  
  return (
    <div className="max-w-screen ">
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Responsive Product card grid</h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
      </div>

        {isLoading && <div className="loading-screen max-w-screen h-full flex justify-center items-center"><BookLoader
        background={"linear-gradient(135deg, #6066FA, #4645F6)"}
        desktopSize={"100px"}
        mobileSize={"80px"}
        textColor={"#4645F6"}
      /></div>}
      <section className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        

        {/* {error && (
          <div className="error-message">
            An error occurred while fetching books.
          </div>
        )} */}
        {!isLoading && !error && (
          <>
            {books.map((book) => (
              <div
                key={book.key}
                className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
              >
                <a href="#">
                  {book.oclc ? (
                    <img
                      src={
                        Array.isArray(book.oclc)
                          ? `https://covers.openlibrary.org/b/oclc/${book.oclc[0]}-L.jpg`
                          : `https://covers.openlibrary.org/b/oclc/${book.oclc}-L.jpg`
                      }
                      className="h-80 w-72 object-cover rounded-t-xl"
                      alt="Product"
                      onError={(e) => {
                        e.target.src = fallbackUrl;
                      }}
                    />
                  ) : (
                    <img
                      src={fallbackUrl}
                      alt="Image not available"
                      className="h-80 w-72 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="px-4 py-3 w-72">
                    <span className="text-gray-400 mr-3 uppercase text-xs">
                      Brand
                    </span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                      {book.title}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black cursor-auto my-3">
                        $149
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          $199
                        </p>
                      </del>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Cards;
