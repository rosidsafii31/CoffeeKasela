import ProdukTitles from "./ProdukTitle";
import Link from 'next/link';

export default function InfoProduk({
  title,
  berat,
  harga,

}) {
  return (
    <>
      <ProdukTitles
        title={title}
      />
      <div className="">
      <p className=" mt-2 mx-3 text-xl font-produk4 font-semibold text-pink-low text-center">
        {harga}
      </p>
      </div>
     
    </>
  );
}
