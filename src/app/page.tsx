"use client"
import Pagination from "@/components/Pagination";

interface searchParamProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
}

const data = [
  "entry 1",
  "entry 2",
  "entry 3",
  "entry 4",
  "entry 5",
  "entry 6",
  "entry 7",
  "entry 8",
  "entry 9",
  "entry 10",
]

export default function Home({ searchParams }: searchParamProps) {
  // console.log(searchParams); // http://localhost:3000/?name=jasmeet&age=22 => { name: 'jasmeet', age: '22' }
  let page = searchParams["page"] ?? "1"
  let per_page = searchParams["per_page"] ?? "5"

  const startIndex = (Number(page) - 1) * Number(per_page) // page === 3 ? (3 - 1) * 2 = 4 startIndex
  const endIndex = startIndex + Number(per_page) // startIndex === 4 ? 4 + 2 = 6 endIndex

  const items = data.slice(startIndex, endIndex)

  const currentPage = Number(page);
  const totalPages = Math.ceil(data.length / Number(per_page));

  return (
    <div>
      <p>Hello World</p>
      <div>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <Pagination data={data} hasNextPage={endIndex < data.length} hasPrevPage={startIndex > 0} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
