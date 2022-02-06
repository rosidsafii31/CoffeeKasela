import Link from 'next/link';
import InfoProduk from './InfoProduk';

export default function CardProduk({product}) {
 
  return (
    <article className=" bg-green-400 p-10 " >
      <Link href={`/product/${product._id}`} >
        <div className="border-solid border-5 border-green-900" >
          <img src={product.img[0].url} className="w-full  max-h-40 object-contain content-center mt-3 mb-3" />
        </div>
      </Link>
      <InfoProduk
      title = {product.title}
      harga ={`Rp.${product.harga}`}
      
      />
       <div className="rounded-md shadow ">
        <Link href={`/product/${product._id}`} >
                <a className="w-full font-produk4 flex items-center justify-center px-5 py-3 border border-black  text-xl rounded-md text-white hover:text-black bg-blue-700 hover:bg-blue-600 md:py-4 md:text-xl md:px-10">
            BELI
                </a>
                </Link>
              </div>
    </article>
  );
}
