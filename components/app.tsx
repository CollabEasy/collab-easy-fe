import React from "react";
import Layout from "./layout";
import RoutesContext from "./routeContext";
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'
import Notification from "./notifications/notification";

const App = ({ children, routes }) => {
  const props = {
    children,
  };

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <RoutesContext.Provider value={routes}>
        <Layout {...props} />
      </RoutesContext.Provider>
    </>
  );
};

export default App;
