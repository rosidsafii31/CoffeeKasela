import Link from 'next/link';

export default function PostProduk({ judulproduk,harga,berat,deskripsi, slug}) {
  return (
    <>
        <h2 className="text-4xl mt-16 text-center font-produk2 font-extrabold text-black">
        <Link href={`/${slug}`}><a>{judulproduk}</a></Link>
      </h2>
      <div className=" text-black/60 font-produk2 mt-4 space-x-4">
        <div>
          {harga}
        </div>
        <div>
          {berat}
        </div>
        <div>
          {deskripsi}
        </div>
      </div>
    </>
  );
}
