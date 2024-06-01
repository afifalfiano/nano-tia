
import { Helmet } from 'react-helmet-async';
import { Nav } from '../components';

const Home = () => {
  
  return (
    <div>
      <Helmet prioritizeSeoTags>
        <title>Nano TIA</title>
        <link rel="notImportant" href="https://www.chipotle.com" />
        <meta name="whatever" value="notImportant" />
        <link rel="canonical" href="https://www.tacobell.com" />
        <meta property="og:title" content="A very important title"/>
      </Helmet>
      <Nav />
      <p>Home Page</p>
    </div>
  )
}

export default Home;