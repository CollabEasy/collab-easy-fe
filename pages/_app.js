import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/index.scss'
import 'animate.css';
import NextApp from "next/app";
import { withRouter, Router } from "next/router";
import React from "react";
import { Provider } from "react-redux";
import App from "components/app";
import { routes } from "config/routes";
import createStore from "../state/index";
import Script from 'next/script'

import { GA_TRACKING_ID } from '../lib/gtag'

export const HOTZAR_CLIENT_ID = process.env.HOTZAR_CLIENT_ID

const makeStore = (preloadedState = {}) => {
  return createStore(routes, preloadedState);
};

class WondorApp extends NextApp {
  static async getInitialProps({ Component, ctx }) {
   const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    const config = {
      routes,
    };
    const store = makeStore({});

    return (
      <>
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${HOTZAR_CLIENT_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
            }}
          />
      <Provider store={store}>
        <App {...config}>
            <Component {...pageProps} />
        </App>
      </Provider>
      </>
    );
  }
}

export default withRouter(WondorApp);
