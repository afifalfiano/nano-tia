import { useEffect, useState } from "react";
import { decrementLimitById, selectReadLimit } from "../store/features/read-limit/readLimitSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

const withPayWall = (WrappedComponent) => {
  const WithPaywall = (props) => {
    let [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const {slug} = useParams();
    const [limitReached, setLimitReached] = useState(false);
    const [cacheContent, setCacheContent] = useState(false);
    const {total, ids} = useSelector(selectReadLimit);
    const dispatch = useDispatch()

    const decrementReadLimit = () => {
      const payload = {id: id};
      dispatch(decrementLimitById(payload));
    }

    useEffect(() => {
      decrementReadLimit();
      const cacheId = ids.some(data => data === +id);
      setCacheContent(cacheId);
      if (!cacheId && total === 0) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    }, [id, slug])

    const propsChild = {
      ...props,
      id,
      ids,
      slug,
      total,
      limitReached,
      cacheContent
    }

    return <WrappedComponent {...propsChild} />
  }
  return WithPaywall
}


export default withPayWall;