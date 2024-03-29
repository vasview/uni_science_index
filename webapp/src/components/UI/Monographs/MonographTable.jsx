import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export const MonographTable = (props) => {
  const { monographs, delMonograph, editMonograph } = props;

  return (
    <Grid>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
          <th className='fs-4'>Название монографии</th>
            <th className='fs-4'>Издание</th>
            <th className='fs-4'>Дата</th>
            <th className='fs-4'>Местное</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {monographs.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.name}</td>
              <td className='fs-4'>{item.place}</td>
              <td className='fs-4'>{item.publication_date}</td>
              <td className='fs-4 text-center'>
                <Checkbox 
                  checked={item.is_local} 
                  disabled 
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />
              </td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editMonograph(idx)}
                  >
                    <EditIcon color='warning' fontSize='large'/>
                </IconButton>
                <IconButton 
                  edge='end' 
                  aria-label='delete_record'
                  sx={ {  
                    marginRight: 2,
                    padding: 0
                  }}
                  value={item.id}
                  onClick={delMonograph}
                >
                  <DeleteForeverSharpIcon color='error' fontSize='large'/>
                </IconButton>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </Grid>
  )
}
