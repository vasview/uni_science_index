import React from 'react';
import Contatiner from '@mui/material/Container'

export default function NotFound() {
  return (
     <Contatiner disableGutters>
        <div style={{ height: 100 }}></div>

        <div className="not_found">
          <h1>404</h1>

          <h2>Страница не найдена!</h2>
        </div>
      </Contatiner>
  );
}
