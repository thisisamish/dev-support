// TODO: Put appropriate metatags in all the pages

import Head from "next/head";

const Metatags = ({ title, desc, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="a blog" />
      <meta name="twitter:site" content="@dev_support" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default Metatags;
