import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

const BaseLayout = () => {

    return (
      <>
				<Header />
          <main id='main' className={''}>
            {/* {props.children} */}
            <Outlet />
          </main>
				<Footer />
      </>
    );
}

export default BaseLayout