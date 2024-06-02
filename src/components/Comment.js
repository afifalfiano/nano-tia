import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from '../pages/DetailPost.module.css';
import {convertDate} from '../utils'

const Comment = ({post}) => {
  const {comments} = post;
  
  return (
    <div className="py-4">
      {comments?.comments?.length > 0 && 
        <>
        <h4 className='d-inline'>Comments </h4><span className="badge bg-primary me-1">{comments?.comments?.length}</span><h4 className='d-inline'>:</h4>
        <div className={`${styles['wrap-comment']} mt-3`}>
        {comments?.comments?.map(comment => {
          return (
            <div className='py-2'>
            <div>
              <LazyLoadImage 
                src={comment?.author?.avatar_url}
                alt={comment?.author?.display_name}
                loading='lazy'
                className='rounded-circle img-fluid img-responsive'
                placeholdersrc={'/default-image.png'}
                effect="blur"
                width={'28px'} 
                height={'28px'}
              />
              <span className='mx-2 fw-semibold'>{comment?.author?.display_name}</span>
              <span className='text-secondary'>{convertDate(comment?.author?.date_gmt)}</span>
            </div>
            <div className="border border-secondary mt-2 rounded-3 p-2" dangerouslySetInnerHTML={{ __html: comment?.content}}></div>
            </div>
          )
        })}
        </div>
        </>
      }
    </div>
  )
}

export default Comment;