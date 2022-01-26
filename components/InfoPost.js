import PostMetaTitle from '../components/PostMetaTitle';

export default function InfoPost({
  createdAt,
  title,
  content,
}) {
  return (
    <>
      <PostMetaTitle   
        title={title}
        createdAt={createdAt}
      />
      <div className="">
      <p className=" text-black text-base line-clamp-6  font-produk2 sm:break-all mt-3 mx-3">
        {content}
      </p>
      </div>
    </>
  );
}
