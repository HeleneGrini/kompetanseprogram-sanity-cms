import PropTypes from "prop-types";
import React from "react";
import Layout from "../components/Layout";

export default (props) => {
  const { config } = props;
  console.log("index", props);
  return (
    <Layout config={config}>
      <h1>No route set</h1>
      <h2>Setup automatic routes in sanity or custom routes in next.config.js</h2>
    </Layout>
  );
};

// export async function getStaticProps() {
//   const res = await fetch("https://.../posts");
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     revalidate: 1, // In seconds
//   };
// }
