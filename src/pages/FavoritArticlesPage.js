import { useSelector } from 'react-redux';
import { selectFavoritArticles } from '../store/features/favorit-articles/favoritArticlesSlice';
import { CardList, Seo } from '../components';
import useNavigateWithTransition from '../hooks/useNavigateWithTransitions';

const FavoritArticlesPage = () => {
  const {articles} = useSelector(selectFavoritArticles);
  const {goToPath} = useNavigateWithTransition();
  const goToDetail = (post) => {
    const {id, slug} = post;
    const url = `/post/${slug}?id=${id}`;
    goToPath(url);
  }

  return (
    <div className='container py-5'>
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
      {articles?.length === 0 && <p>No Favorit Articles</p>}
      {articles?.length > 0 && articles.map((post, idx) => {
        return (
          <div key={idx}>
          <CardList 
            post={post}
            goToDetail={goToDetail}
            id={post?.id}
            ref={null}
          />
          </div>
        )
      })}
    </div>
  )
}


export default FavoritArticlesPage;