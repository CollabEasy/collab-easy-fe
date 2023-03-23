/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import Document, { Html, Head, Main, NextScript } from 'next/document'
import landingMobileImg from '../public/images/thumbnail.png';
import Image from "next/image";

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />

          <meta property="og:title" content='Wondor'/>
          <meta property="og:description" content="Meet artists to collaborate with on your next big idea!"/>
          <meta property="og:url" content='https://www.wondor.art'/>
          <meta property="og:type" content='website'/>
          {/* // This is a hack https://stackoverflow.com/questions/71305450/og-image-meta-tag-with-next-js-is-not-working */}
          <Image src="../public/images/thumbnail.png" alt="" style={{ display: 'none'}} />
          <meta property="og:image" content={"https://www.wondor.art" + '/images/thumbnail.png'}/>
          <meta property="og:image:width" content='1200' />
          <meta property="og:image:height" content='627' />
          <meta property="og:image:type" content='image/png'/>

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
