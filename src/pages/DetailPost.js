import { Nav, PayWallContent, Seo, withPayWall } from '../components';
import { useEffect, useRef, useState } from 'react';
import data from '../mocks/data.json';
import { createPortal } from 'react-dom';

const DetailPost = ({
  ids,
  id,
  total,
  slug,
  limitReached,
  cacheContent
}) => {
  const [post, setPost] = useState(data.posts.find(item => +item.id === +id) || null);
  const [lazyPost, setLazyPost] = useState(post?.content?.slice(0, 2000));
  const [showModal, setShowModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, [])

  useEffect(() => {
    if (limitReached) {
      console.log('Your have reach the limit of read. Please subscribe...');
      setShowModal(true);
      setLazyPost(prev => prev?.slice(0, 2000))
    }
  }, [limitReached])

  const refRead = useRef(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }
    const observer = new IntersectionObserver(callbackFn, options);
    if (refRead.current) {
      observer.observe(refRead.current)
    };

    return () => {
      if (refRead.current) {
        observer.unobserve(refRead.current);
      }
    }

  }, [refRead])

  const infiniteScrollContent = () => {
    setLazyPost(prev => {
      const content = prev + post.content.slice(prev?.length, prev?.length + 2000);
      return content;
    })
  }

  const callbackFn = (entries) => {
    const [entry] = entries;
    const isLastContent = entry?.target?.id === 'last-content';
    if (entry.isIntersecting && isLastContent) {
      infiniteScrollContent();
    }
  }
  

  return (
    <div style={{padding: '32px'}}>
        <Seo
        title={post?.seo?.title}
        description={post?.seo?.description}
        type="website"
        name={post?.author?.display_name}
        image={post?.seo?.image}
        canonical={post?.seo?.canonical_link}
        url={post?.link}
        prioritizeSeoTags={true}
        />
      <Nav />

      <p>Detail Post {post?.title} {id}</p>
      <p>Total Current Limit: {total}</p>
      <p>Ids: {JSON.stringify(ids)}</p>
      <div id='content' dangerouslySetInnerHTML={{__html: lazyPost}}></div>
      {(!limitReached || (limitReached && cacheContent)) && lazyPost?.length < post?.content?.length && <div id='last-content' ref={refRead}>Please Scroll</div>}
      {showModal && createPortal(
        <PayWallContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </div>
  )
}

export default withPayWall(DetailPost);