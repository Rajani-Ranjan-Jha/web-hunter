import React from 'react'

const oldcontrol = () => {
    return (
        <div className="flex justify-center items-center gap-4 mb-10">
            {currentPage > 1 && (
                <Link to={currentPage === 2 ? '/' : `/rajkapage-${currentPage - 1}`} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Previous
                </Link>
            )}
            {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                    <Link
                        key={page}
                        to={page === 1 ? '/' : `/rajkapage-${page}`}
                        className={`px-4 py-2 rounded hover:bg-indigo-700 ${page === currentPage ? 'bg-indigo-800 text-white' : 'bg-indigo-600 text-white'}`}
                    >
                        {page}
                    </Link>
                );
            })}
            {currentPage < totalPages && (
                <Link to={`/rajkapage-${currentPage + 1}`} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                    Next
                </Link>
            )}
        </div>
    )
}

export default oldcontrol
