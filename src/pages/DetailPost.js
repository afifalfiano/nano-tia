import {useParams} from 'react-router-dom';
import { Nav } from '../components';
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import { selectReadLimit, decrementLimitById } from '../store/features/read-limit/readLimitSlice';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import data from '../mocks/data.json';

const DetailPost = () => {
  const { slug } = useParams();
  let [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [post, setPost] = useState(data.posts.find(item => +item.id === +id) || null);

  const {total, ids} = useSelector(selectReadLimit);
  const dispatch = useDispatch()
 
  const decrementReadLimit = () => {
    const payload = {id: id};
    dispatch(decrementLimitById(payload));
  }

  useEffect(() => {
    decrementReadLimit();
    const cacheId = ids.some(data => data === +id);
    if (!cacheId && total === 0) {
      alert('Your have reach the limit of read. Please subsribe...');
    }
  }, [id, slug])

  console.log(post)

  return (
    <div style={{padding: '32px'}}>
      <Helmet prioritizeSeoTags>
        <title>{post?.seo?.title}</title>
        <link rel="canonical" href={post?.seo?.canonical_link} />
        <meta property="og:title" content={post?.seo?.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={post.link} />
        <meta property="og:description" content={post?.seo?.description} />
        <meta property="og:image" content={post?.seo?.image} />
      </Helmet>
      <Nav />
      <p>Detail Post {post?.title}</p>
      <p>Total Current Limit: {total}</p>
      <p>Ids: {JSON.stringify(ids)}</p>
      <div dangerouslySetInnerHTML={{__html: post?.content}}></div>
    </div>
  )
}

export default DetailPost;