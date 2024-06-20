import { CardList, Seo } from '../components';
import { useGetPostListsQuery } from '../services/list-articles';
import data from '../mocks/data.json';
import { useEffect, useRef, useState } from 'react';
import {removeDuplicate} from '../utils';
import useNavigateWithTransition from '../hooks/useNavigateWithTransitions';

const Home = () => {
  const { data: datas, error, isLoading } = useGetPostListsQuery({page: 1, perPage: 20});
  console.log(datas, error, isLoading);
  const [response, setResponse] = useState(data || []);
  const [responseLocal, setResponseLocal] = useState([...response?.posts?.slice(0, 10)] || []);
  const refTarget = useRef(null);
  const {goToPath} = useNavigateWithTransition();

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

  const goToDetail = (post) => {
    const {id, slug} = post;
    const url = `/post/${slug}?id=${id}`;
    goToPath(url);
  }

  return (
    <div className='container py-5'>
      <Seo
      title="Nano TIA"
      description="Nano TIA"
      type="website"
      name="Anonymous"
      image="./default-image.png"
      canonical="/"
      prioritizeSeoTags={true}
      />
      {responseLocal?.map((post, idx) => {
        return (
          <div key={idx}>
          <CardList
            post={post}
            goToDetail={goToDetail}
            ref={responseLocal?.length > 7 && idx === responseLocal?.length - 1 ? refTarget : null}
            id={idx === responseLocal?.length - 1 ? `last-item`: post?.id} 
          />
          </div>
        )
      })}
      
    </div>
  )
}

export default Home;