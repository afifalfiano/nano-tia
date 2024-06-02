import styles from '../pages/DetailPost.module.css';
import {convertDate} from '../utils'

const Comment = ({post}) => {
  const {comments} = post;
  
  return (
    <div className="py-4">
      {comments?.comments?.length > 0 && 
        <>
        <h4 className='d-inline'>Comments </h4><span class="badge bg-primary me-1">{comments?.comments?.length}</span><h4 className='d-inline'>:</h4>
        <div className={`${styles['wrap-comment']} mt-3`}>
        {comments?.comments?.map(comment => {
          return (
            <div className='py-2'>
            <div>
              <img src={comment?.author?.avatar_url} alt={comment?.author?.display_name} className='img-responsive rounded-circle me-2'/>
              <span className='pe-2 fw-semibold'>{comment?.author?.display_name}</span>
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