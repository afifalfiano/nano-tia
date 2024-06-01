import {useParams} from 'react-router-dom';
import { Nav } from '../components';
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from 'react-redux';
import { selectReadLimit, decrementLimitById } from '../store/features/read-limit/readLimitSlice';
import { useEffect, useState } from 'react';

const DetailPost = () => {
  const { id } = useParams();
  const {total, ids} = useSelector(selectReadLimit);
  const dispatch = useDispatch()
 
  const decrementReadLimit = () => {
    const payload = {id};
    dispatch(decrementLimitById(payload));
  }

  useEffect(() => {
    decrementReadLimit();
    const cacheId = ids.some(data => data === +id);
    if (!cacheId && total === 0) {
      alert('Your have reach the limit of read. Please subsribe...');
    }
  }, [id])

  return (
    <div>
      <Helmet prioritizeSeoTags>
      <title>Detail Post {id}</title>
      <link rel="notImportant" href="https://www.chipotle.com" />
      <meta name="whatever" value="notImportant" />
      <link rel="canonical" href="https://www.tacobell.com" />
      <meta property="og:title" content="A very important title"/>
      </Helmet>
      <Nav />
      <p>Detail Post {id}</p>
      <p>Total Current Limit: {total}</p>
      <p>Ids: {JSON.stringify(ids)}</p>
    </div>
  )
}

export default DetailPost;