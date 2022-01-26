import Link from 'next/link';

export default function ProdukTitles({ title }) {
  return (
    <>
      <div className="flex items-center text-black/60 space-x-4">
        <div className="uppercase">
        </div>
        <div>
        </div>
      </div>
      <h2 className="text-xl mt-4 capitalize  text-center font-produk2 font-bold text-gray-hitam">
        <a>{title}</a>
      </h2>
    </>
  );
}
