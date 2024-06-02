import React from 'react';

import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, type, name, canonical, url, image, prioritizeSeoTags }) => {
  return (
    <Helmet prioritizeSeoTags={prioritizeSeoTags}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default Seo;