import { useSelector } from 'react-redux';
import { selectFavoritArticles } from '../store/features/favorit-articles/favoritArticlesSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components';

const FavoritArticlesPage = () => {
  const {articles} = useSelector(selectFavoritArticles);
  const navigate = useNavigate();
  const goToDetail = (post) => {
    const {id, slug} = post;
    navigate(`/post/${slug}?id=${id}`);
  }

  return (
    <div style={{padding: '64px 32px'}}>
      <Seo
      title="Favorit Articles | Nano TIA"
      description="Favorit Articles | Nano TIA"
      type="website"
      name="Anonymous"
      image="./default-image.png"
      canonical="/"
      prioritizeSeoTags={true}
      />
      <h1>Favorit Articles</h1>
      {articles?.length === 0 && <p>No articles favorit!</p>}
      {articles?.length > 0 && articles.map(post => {
        return (
          <div onClick={() => goToDetail(post)} style={{margin: '32px 0', cursor: 'pointer'}} key={post.id}>
            <h3>{post.title}</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: 0}}><p style={{margin: 0}}>Categories:</p> <br/> {post.categories.map(item => <span style={{padding: '6px', background: 'blue', color: '#fff', margin: '3px', borderRadius: '8px'}}>{item.name}</span>)}</div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', margin: 0}}><p style={{margin: 0}}>Tags:</p> <br/>{post.tags.map(item => <span style={{padding: '6px', background: 'gray', margin: '3px', borderRadius: '8px', color: '#FFF'}}>{item.name}</span>)}</div>
            <div className='w-100 text-center'>
              <LazyLoadImage
                  src={post?.featured_image?.source}
                  alt={post.title}
                  loading='lazy'
                  width={600} height={400}
                  placeholdersrc={'default-image.png'}
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


export default FavoritArticlesPage;