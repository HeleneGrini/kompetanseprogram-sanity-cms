import PropTypes from "prop-types";
import React, { Component } from "react";
import NextSeo from "next-seo";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import Layout from "../components/Layout";
import client from "../client";
import RenderSections from "../components/RenderSections";

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[_type == "route" && slug.current == $slug][0]{
  page-> {
    ...,
    content[] {
      ...,
      cta {
        ...,
        route->
      },
      ctas[] {
        ...,
        route->
      }
    }
  }
}
`;

const LandingPage = (props) => {
  const {
    title = "Missing title",
    description,
    disallowRobots,
    openGraphImage,
    content = [],
    slug,
    url,
    mainNavigation,
    footerNavigation,
    footerText,
    logo,
  } = props;

  const openGraphImages = openGraphImage
    ? [
        {
          url: builder.image(openGraphImage).width(800).height(600).url(),
          width: 800,
          height: 600,
          alt: title,
        },
        {
          // Facebook recommended size
          url: builder.image(openGraphImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          // Square 1:1
          url: builder.image(openGraphImage).width(600).height(600).url(),
          width: 600,
          height: 600,
          alt: title,
        },
      ]
    : [];

  // console.log(props);
  return (
    <Layout config={{ title, mainNavigation, footerNavigation, footerText, logo, url }}>
      <NextSeo
        config={{
          title,
          titleTemplate: `${props.title} | %s`,
          description,
          canonical: props.url && `${props.url}/${slug}`,
          openGraph: {
            images: openGraphImages,
          },
          noindex: disallowRobots,
        }}
      />
      {content && <RenderSections sections={content} />}
    </Layout>
  );
};

LandingPage.getInitialProps = ({ query }) => {
  const { slug } = query;
  if (!query) {
    console.error("no query");
    return;
  }
  if (slug && slug !== "/") {
    return client.fetch(pageQuery, { slug }).then((res) => ({ ...res.page, slug }));
  }

  // Frontpage
  if (slug && slug === "/") {
    return client
      .fetch(
        groq`
      *[_id == "global-config"][0]{
        frontpage -> {
          ...,
          content[] {
            ...,
            cta {
              ...,
              route->
            },
            ctas[] {
              ...,
              route->
            }
          }
        }
      }
    `
      )
      .then((res) => {
        console.log("res", res);
        return { ...res.frontpage, slug };
      });
  }

  return null;
};

export default LandingPage;
