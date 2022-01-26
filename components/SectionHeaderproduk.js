export default function SectionHeader({ children }) {
  return (
    <div className="bg-halaman-texture font-produk4 font-medium underline text-white bg-cover bg-center  ">
       <p className=" text-7xl pt-28 pb-28 text-white text-center">
   {children}
   </p>
    </div>
  );
}
