import Link from 'next/link';

export default function PostDetail(props) {
  return (
    <>
        <h2 className="text-4xl mt-12 text-center font-produk2 font-extrabold text-black">
        <a>{props.title}</a>
      </h2>
      <div className="flex items-center text-black/60 font-produk2 mt-4 space-x-4">
        <div>
          {props.createdAt}
        </div>
      </div>
    </>
  );
}
