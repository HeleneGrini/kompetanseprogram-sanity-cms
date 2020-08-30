import React from "react";
import App from "next/app";
import client from "../client";
// import 'normalize.css'
import "../styles/shared.module.css";
import "../styles/layout.css";

const siteConfigQuery = `
  *[_id == "global-config"] {
    ...,
    logo {asset->{extension, url}},
    mainNavigation[] -> {
      ...,
      "title": page->title
    },
    footerNavigation[] -> {
      ...,
      "title": page->title
    }
  }[0]
  `;

const MyApp = ({ Component, pageProps, config }) => {
  return <Component {...pageProps} {...config} />;
};

MyApp.getInitialProps = async (appContext) => {
  let pageProps = await App.getInitialProps(appContext);
  const config = await client.fetch(siteConfigQuery);

  return { ...pageProps, config };
};
export default MyApp;
