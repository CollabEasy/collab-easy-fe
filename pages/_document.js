/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import Title from '../components/title'

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="google-site-verification" content="6nHQ9QN0l77uDx7o9Ss1difr_Hw3QnK_kIcuNEgc5xY" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />

          <meta property="og:title" content='Wondor'/>
          <meta property="og:description" content="Meet with artists, schedule & manage your collaboration requests, join monthly contests, find themes and ideas for your next work on Wondor!"/>
          <meta property="og:url" content='https://www.wondor.art'/>
          <meta property="og:type" content='website'/>
          <meta property="og:image" content="https://www.wondor.art/images/mobile-landing.svg"/>
          <meta property="og:image:width" content='1200' />
          <meta property="og:image:height" content='627' />
          <meta property="og:image:type" content='image/png'/>

          <meta name="twitter:card" content="Wondor" />
          <meta name="twitter:title" content="Wondor" />
          <meta name="twitter:description" content="Meet with artists, schedule & manage your collaboration requests, join monthly contests, find themes and ideas for your next work on Wondor!" />
          <meta name="twitter:image" content="https://www.wondor.art/images/mobile-landing.svg" />

          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Nova+Round|Varela+Round&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
