import { AppProps } from 'next/app';
import NextHead from 'next/head';

import GlobalStyles from 'styles/global';

const App: any = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <NextHead>
        <meta charSet="UTF-8" />
        <title>Masterflix</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/static/thumbnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="localhost" />
        <meta property="og:title" content="MasterFlix" />
        <meta
          property="og:description"
          content="Tenha suas playlists favoritas em um só lugar."
        />
        <meta
          name="description"
          content="Tenha suas playlists favoritas em um só lugar."
        />
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="shortcut icon" href="/static/icon-512.png" />
        <link rel="apple-touch-icon" href="/static/icon-512.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#0d6094" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="/css/slick.min.css" />
        <link rel="stylesheet" href="/css/slick-theme.min.css" />
      </NextHead>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default App;
