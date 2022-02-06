
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className=" bg-neutral-800 text-center text-white">
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className="lg:flex">
          <div className="lg:flex">
            <div className="w-full pt-6 pr-2 pl-2 mb-12 lg:mb-0 lg:w-1/2">
              <h2
                style={{ fontFamily: "font-produk3" }}
                className="font-bold text-3xl text-gray-lightest mb-4"
              >
                LOCATION
              </h2>
              <div className=" pt-6 px-4 sm:px-6 lg:px-6 flex justify-center  ">
                
              </div>
              <p className="text-white pt-2 ">
                LINGKUNGAN KACANGAN ASRI RT 02 RW 02 KELURAHAN GOMBENGSARI
                KECAMATAN KALIPURO KABUPATEN BANYUWANGI
              </p>
            </div>
            <div className="w-full mb-12 pt-6 pr-2 pl-2 lg:mb-0 lg:w-1/2">
              <h2
                style={{ fontFamily: "font-produk3" }}
                className="font-bold text-3xl text-gray-lightest mb-4"
              >
                SOSIAL MEDIA
              </h2>
              <>
                <div className=" pt-6 px-4 sm:px-6">
        
                <ul className=" text-gray-lightest font-produk2 font-semibold text-xl flex items-center  flex-col space-y-4">
                <li>
                  <Link href="https://instagram.com/kaselacoffee?utm_medium=copy_link">
                    <a className="hover:underline md:text-2xl md:font-produk2  ">
                      Instagram
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/profile.php?id=100074329173783">
                    <a className="hover:underline md:text-2xl md:font-produk2  ">
                      Facebook
                    </a>
                  </Link>
                  </li>
                  <li>
                  <Link href="https://youtube.com/channel/UCIXY0_lGWR15cvfWV2jE8XA">
                    <a className="hover:underline md:text-2xl md:font-produk2  ">
                      Youtube
                    </a>
                  </Link>
                  </li>
                  </ul>  
                </div>
              </>
            </div>
            <div className="w-full  pt-6 pr-2 pl-2 lg:mb-0 lg:w-1/2">
              <h2
                style={{ fontFamily: "font-produk3" }}
                className="font-bold text-3xl text-gray-lightest mb-4"
              >
                JALAN PINTAS
              </h2>
              <div className=" pt-6 px-4 sm:px-6">
              <ul className=" text-gray-lightest font-produk2 font-semibold text-xl flex items-center  flex-col space-y-4">
                <li>
                  <Link href="/">
                    <a className="hover:underline md:text-2xl md:font-produk2  ">
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/produk">
                    <a className="hover:underline md:text-2xl md:font-produk2  ">
                      Product
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/artikel">
                    <a className="hover:underline md:text-2xl md:font-produk2 ">
                      Artikel
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/profilkasela">
                    <a className="hover:underline md:text-2xl md:font-produk2 ">
                      Profil Kasela
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer bottom */}
      <div
        style={{
          fontFamily: "font-produk2",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <div className="container bg-gray-hitam mx-auto px-6 lg:px-20 py-6">
          <div className="flex font-produk3 justify-center text-gray-lightest text-sm">
            <p>
              Designed by <span className="font-bold">Coffee Kasela</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
