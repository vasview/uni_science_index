import React from 'react';
import './App.css';

import RouteTable from './routes';
import BaseLayout from './shared/Layout';

function App() {
  return (
    <BaseLayout>
      <RouteTable />
    </BaseLayout>
  );
}

export default App;
