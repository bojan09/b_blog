// styles
import "@/styles/globals.scss";

// state & effect
import React, { useState, useEffect } from "react";

// layout component
import { Layout } from "../components";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
