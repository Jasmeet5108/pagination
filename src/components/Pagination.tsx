import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface PaginationProps {
    data: string[];
    hasNextPage: boolean;
    hasPrevPage: boolean;
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ hasNextPage, hasPrevPage, data, currentPage, totalPages }: PaginationProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    let page = searchParams.get("page") ?? "1"
    let per_page = searchParams.get("per_page") ?? "5"

    const goToPage = (page: number) => {
        router.push(`/?page=${page}&per_page=${per_page}`);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`pagination-button ${currentPage === i ? 'text-sky-500' : ''}`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    }

    return (
        <>
            <div className='text-xl font-bold my-3'>Pagination</div>

            <div className="flex items-center gap-2">
                <button
                    className='bg-blue-500 text-white p-1'
                    disabled={!hasPrevPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
                    }}
                >
                    Prev
                </button>

                {renderPageNumbers()}

                <button
                    className='bg-blue-500 text-white p-1'
                    disabled={!hasNextPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
                    }}
                >
                    Next
                </button>
            </div>

            {/* <div className='flex items-center gap-2'>
                <button
                    className='bg-blue-500 text-white p-1'
                    disabled={!hasPrevPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
                    }}
                >
                    Prev
                </button>

                <div>
                    {page} / {Math.ceil(data.length / Number(per_page))}
                </div>

                <button
                    className='bg-blue-500 text-white p-1'
                    disabled={!hasNextPage}
                    onClick={() => {
                        router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
                    }}
                >
                    Next
                </button>
            </div> */}
        </>
    )
}

export default Pagination