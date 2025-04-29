import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>College Finder - Find Your Perfect College in India</title>
          <meta name="application-name" content="College Finder" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="College Finder" />
          <meta
            name="description"
            content="Find the best colleges in India for your future. College Finder helps students explore college details, placements, courses, scholarships, admissions, and more with real-time data and reviews."
          />
          <meta
            name="keywords"
            content="College Finder, Indian Colleges, Engineering Colleges, Medical Colleges, College Reviews, Admissions, Placements, Scholarships"
          />
          <meta name="author" content="College Finder Team" />
          <meta name="robots" content="index, follow" />
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="theme-color" content="#001F3F" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
