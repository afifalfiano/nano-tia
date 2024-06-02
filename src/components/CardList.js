import { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { convertDate } from "../utils";

const CardList = forwardRef((props, ref) => {
  const {
    goToDetail,
    id,
    key,
    post
  } = props;

  return (
    <div className="card mb-3 w-100 cursor-pointer" onClick={() => goToDetail(post)} key={key} ref={ref} id={id}>
      <div className="row g-0">
        <div className="col-md-4">
            <LazyLoadImage 
              src={post?.featured_image?.source}
              alt={post.title}
              loading='lazy'
              style={{
                backgroundSize: 'cover'
              }}
              className='img-responsive rounded-start w-100'
              placeholdersrc={'/default-image.png'}
              effect="blur"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title d-inline-block me-2">{post?.title}</h5>
            <div className="card-text m-0 text-secondary">
              <img src={post?.author?.avatar_url} className="rounded-circle img-fluid me-1" alt={post?.author?.display_name} width={'28px'} height={'28px'} />
              <span className="me-2">Author by {post?.author?.display_name}</span> |
              <span className="text-muted mx-2"><small>{post.read_time} min read </small></span> | 
              <span  className='card-text mx-2 text-secondary m-0'><small>Last updated: {convertDate(post?.date_gmt)}</small></span>
            </div>
            <p className='card-text fw-semibold mt-2 m-0'>Categories: <br />
            {post?.categories?.map(item => <span className='badge bg-primary my-1 mx-1'>{item.name}</span>)}
            </p>

            <p className='card-text fw-semibold'>Tags: <br />
            {post?.tags?.map(item => <span className='badge bg-warning my-1 mx-1'>{item.name}</span>)}
            </p>
            <p className="card-text mt-1 m-0">{post?.seo?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
})


export default CardList;