import React from "react";
import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { CurlList } from "@/views/CurlList";
// import { Geist, Geist_Mono } from "next/font/google";

export default function Home() {
  return (
    <>
      <Head>
        <title>cURL Hub</title>
        <meta
          name="description"
          content="Quer facilidade e agilidade para testar suas API's? Gerencie comandos cURL e realize testes rápidos!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="msapplication-TileImage" href="/favicon/favicon.ico" />
      </Head>
      <div style={{ display: "flex", gap: "60px", width: "100%", paddingRight: "60px" }}>
        <Navbar />
        <CurlList />
      </div>
    </>
  );
}
