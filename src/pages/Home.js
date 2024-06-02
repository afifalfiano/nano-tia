import { Nav, Seo } from '../components';
// import { useGetPostListsQuery } from '../services/list-articles';
import data from '../mocks/data.json';
import { useEffect, useRef, useState } from 'react';
import {removeDuplicate} from '../utils';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

const Home = () => {
  // const { data: datas, error, isLoading } = useGetPostListsQuery({page: 1, perPage: 20});
  // console.log(datas, error, isLoading);
  const [response, setResponse] = useState(data || []);
  const [responseLocal, setResponseLocal] = useState([...response?.posts?.slice(0, 10)] || []);
  const refTarget = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }  
    const observer = new IntersectionObserver(callbackFn, options);

    if (refTarget.current) {
      observer.observe(refTarget.current);
    }

    return () => {
      if (refTarget.current) {
        observer.unobserve(refTarget.current);
      }
    }

  }, [refTarget])

  const callbackFn = (entries) => {
    const [entry] = entries;
    const isLastItem = entry?.target?.id === 'last-item';
    if (entry.isIntersecting && isLastItem) {
      infiniteScroll();
    }
  }

  const infiniteScroll = () => {
    setResponseLocal(prev => {
      const data = removeDuplicate([
        ...prev,
        ...response?.posts?.slice(prev?.length, prev?.length + 10)
      ])
      return data
    })
  }

  console.log(removeDuplicate(response?.posts), 'full');
  // console.log(responseLocal, 'local');


  const navigate = useNavigate();
  const goToDetail = (post) => {
    const {id, slug} = post;
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(`/post/${slug}?id=${id}`);
      });
    });
  }

  return (
    <div style={{padding: '64px 32px'}}>
      <Seo
      title="Nano TIA"
      description="Nano TIA"
      type="website"
      name="Anonymous"
      image="./default-image.png"
      canonical="/"
      prioritizeSeoTags={true}
      />
      <p>Home Page</p>
      {responseLocal?.map((post, idx) => {
        return (
          <div onClick={() => goToDetail(post)} style={{margin: '32px 0', cursor: 'pointer'}} key={post.id} ref={responseLocal?.length > 7 && idx === responseLocal?.length - 1 ? refTarget : null} id={idx === responseLocal?.length - 1 ? `last-item`: post?.id}>
            <h3>{post.title}</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: 0}}><p style={{margin: 0}}>Categories:</p> <br/> {post.categories.map(item => <span style={{padding: '6px', background: 'blue', color: '#fff', margin: '3px', borderRadius: '8px'}}>{item.name}</span>)}</div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: 0}}><p style={{margin: 0}}>Tags:</p> <br/>{post.tags.map(item => <span style={{padding: '6px', background: 'gray', margin: '3px', borderRadius: '8px', color: '#FFF'}}>{item.name}</span>)}</div>
            <div className='w-100 text-center'>
              <LazyLoadImage 
                  src={post?.featured_image?.source}
                  alt={post.title}
                  loading='lazy'
                  width={600} height={400}
                  placeholdersrc={'/default-image.png'}
                  effect="blur"
              />
            </div>
            <div dangerouslySetInnerHTML={{__html: post.content?.slice(0, 100)}}></div>
          </div>

        )
      })}
      
    </div>
  )
}

export default Home;