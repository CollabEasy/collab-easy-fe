import "bootstrap/dist/css/bootstrap.css";
import "styles/index.scss";
import 'animate.css';
import NextApp from "next/app";
import { withRouter } from "next/router";
import React from "react";
import { Provider } from "react-redux";
import App from "components/app";
import { routes } from "config/routes";
import createStore from "../state/index";

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
      <Provider store={store}>
        <App {...config}>
          <Component {...pageProps} />
        </App>
      </Provider>
    );
  }
}

export default withRouter(WondorApp);
