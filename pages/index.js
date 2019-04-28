import Head from 'next/head';
import { Component } from 'react';
import Method from '../components/Method';

// source: https://github.com/duckduckgo/zeroclickinfo-fathead/tree/master/lib/fathead/mdnjs
// and mixed with examples from Mozilla's
import data from '../array-methods.json';

const mutators = [
  'sort',
  'shift',
  'unshift',
  'pop',
  'push',
  'splice',
  'reverse',
  'fill',
  'copywithin',
];

// ironically: mutate
data.forEach(_ => {
  _.clean = _.method.replace(/\(\)/g, '').toLowerCase();
  _.mutates = mutators.includes(_.clean);
});

const filterMethods = ({ filter, methods }) => {
  return [methods.find(_ => filter === _.clean)];
};

const Page = ({ methods }) => (
  <>
    <Head>
      {methods.length === 1 ? (
        <>
          <title>{methods[0].mutates ? '!mutates' : 'no mutation'}</title>
          <link
            rel="icon"
            sizes="32x32"
            key="favicon"
            href={`/static/${methods[0].mutates ? 'yes' : 'no'}.png`}
          />
        </>
      ) : (
        <>
          <title>Does it mutate?</title>
          <link
            rel="icon"
            sizes="32x32"
            key="favicon"
            href={`/static/favicon.png`}
          />
        </>
      )}
    </Head>

    <h1>Does it mutate 😱</h1>
    {methods.map(_ => {
      return <Method key={_.method} {..._} />;
    })}
  </>
);

Page.getInitialProps = ({ query = {} }) => {
  let methods = data;

  if (query.method) {
    const filter = query.method;
    methods = filterMethods({ methods, filter });
  }

  return {
    methods,
  };
};

export default Page;
