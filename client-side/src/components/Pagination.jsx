
import { Link } from "react-router-dom";

const Pagination = ({
    postsPerPage,
    totalPosts,
    setCurrentPage,
    currentPage,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber, e) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {/* <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? "active" : ""}`}
                        >
                            <a
                                onClick={(e) => paginate(number, e)}
                                href="!#"
                                className="page-link"
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav> */}

            <div className="flex justify-center items-center gap-4 mb-10" role="navigation" aria-label="Pagination Navigation">
                {currentPage > 1 ? (
                    <Link
                        key="prev"
                        onClick={(e) => {
                            paginate(currentPage - 1, e);
                        }}
                        to={currentPage === 2 ? '/' : `/page-${currentPage - 1}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        aria-label="Previous Page"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed select-none" aria-disabled="true">
                        Previous
                    </span>
                )}
                {pageNumbers.map((number) => (
                    <Link
                        onClick={(e) => {
                            paginate(number, e);
                        }}
                        key={number}
                        to={number === 1 ? '/' : `/page-${number}`}
                        className={`px-4 py-2 rounded hover:bg-indigo-700 ${
                            number === currentPage ? 'bg-indigo-800 text-white' : 'bg-indigo-600 text-white'
                        }`}
                        aria-current={number === currentPage ? 'page' : undefined}
                    >
                        {number}
                    </Link>
                ))}
                {currentPage < Math.ceil(totalPosts / postsPerPage) ? (
                    <Link
                        key="next"
                        onClick={(e) => {
                            paginate(currentPage + 1, e);
                        }}
                        to={`/page-${currentPage + 1}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        aria-label="Next Page"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed select-none" aria-disabled="true">
                        Next
                    </span>
                )}
            </div>
        </>
    );
};


export default Pagination