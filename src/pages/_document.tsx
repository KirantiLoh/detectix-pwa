import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />
        <body className='max-w-lg mx-auto shadow-lg bg-slate-50'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}