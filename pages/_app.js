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
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

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
