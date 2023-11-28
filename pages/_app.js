import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
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

  componentDidMount() {
    // Load GTM script asynchronously
    const gtmScript = document.createElement('script');
    gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    // Load GTM configuration script
    const gtmConfigScript = document.createElement('script');
    gtmConfigScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(gtmConfigScript);

    // Load Hotjar script asynchronously
    const hotjarScript = document.createElement('script');
    hotjarScript.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${HOTZAR_CLIENT_ID},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(hotjarScript);
  }


  render() {
    const { Component, pageProps } = this.props;
    const config = {
      routes,
    };
    const store = makeStore({});

    return (
      <>
          {/* <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            async
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
            async
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
            async
          /> */}
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
