import React, { ReactNode } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    no_index: string;
    url: string;
    og_image : string;
  };
}

const Layout = ({ children, metadata }: LayoutProps) => {

  return (
    // OPTIONAL! SEO meta data for pages
    <>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta name="keywords" content={metadata?.keywords.toString()} />
        <meta name="robots" content={metadata?.no_index} />
        <meta property="og:title" content={metadata?.title} />
        <meta property="og:description" content={metadata?.description} />
        <meta property="og:url" content={`https://www.stevenpowers.co.uk/${metadata?.url}`} />
        <meta property="og:image" content={metadata?.og_image} />
        <meta name="twitter:card" content={metadata?.og_image} />
        <meta httpEquiv="content-language" content = "en" />
        <meta name="google-site-verification" content="xn5gDdTmBFv8xc-84JrKaLI_sR-kkS-Ve73_rY1Kico" />
      </Head>
      <main className='sm:bg-[#f4f4f4] font-inter'>
        {children}
      </main>
    </>
  );
};

export default Layout;
