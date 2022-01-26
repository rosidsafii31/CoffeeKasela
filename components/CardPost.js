import Link from 'next/link';
import InfoPost from '../components/InfoPost';
import { formatDate } from '../utils/utils';
export default function CardPost({artikel}) {
  return (
    <article className="shadow-2xl " >
      <Link href={`/artikel/${artikel._id}`}>
        <a>
          <img src={artikel.img[0].url} className="w-full  rounded mb-4" />
        </a>
      </Link>
      <InfoPost
          createdAt={formatDate(artikel.createdAt)}
          title = {artikel.title}
          content ={artikel.content}
      />
    </article>
  );
}
