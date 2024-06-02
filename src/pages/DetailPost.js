import { PayWallContent, Seo, withPayWall } from '../components';
import { useEffect, useRef, useState } from 'react';
import data from '../mocks/data.json';
import { createPortal } from 'react-dom';
import { addToFavorit, selectFavoritArticles, removeFromFavorit } from '../store/features/favorit-articles/favoritArticlesSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DetailPost.module.css'
import Comment from '../components/Comment';

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
  const [showModal, setShowModal] = useState(true);

  const {articles} = useSelector(selectFavoritArticles);
  const dispatch = useDispatch()
  const [isAddedFavorit, setIsAddedFavorit] = useState(articles.some(item => +item.id === +id));

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

  const doAddToFavorit = () => {
    if (!isAddedFavorit) {
      dispatch(addToFavorit({post}));
    }
  }

  const doRemoveFromFavorit = () => {
    if (isAddedFavorit) {
      dispatch(removeFromFavorit({post}))
    }
  }

  useEffect(() => {
    setIsAddedFavorit(articles.some(item => +item.id === +id))
  }, [articles])
  

  return (
    <div className={`${styles['detail-post']} container py-5`}>
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
      <h1>Detail Post {post?.title}</h1>
      {!isAddedFavorit ? <button onClick={() => doAddToFavorit()} className='btn btn-primary'>Add to Favorit</button> : <button type="button" className='btn btn-danger' onClick={() => doRemoveFromFavorit()}>Remove from Favorit</button>}
      <div className='mt-5' id='content' dangerouslySetInnerHTML={{__html: lazyPost}}></div>
      {(!limitReached || (limitReached && cacheContent)) && lazyPost?.length < post?.content?.length && <div id='last-content' ref={refRead}>Please Scroll</div>}
      {showModal && createPortal(
        <PayWallContent onClose={() => setShowModal(false)} />,
        document.body
      )}
      <Comment post={post || []} />
    </div>
  )
}

export default withPayWall(DetailPost);