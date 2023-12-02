import React from 'react';
import Footer from './footer';
import Header from './header';

export default function BaseLayout(props) {

    return (
      <>
				<Header />
        <main id='main' className={''}>
					{props.children}
				</main>
				<Footer />
      </>
    );
}