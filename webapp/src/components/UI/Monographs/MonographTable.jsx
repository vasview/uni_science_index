import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export const MonographTable = (props) => {
  const { monographs, delMonograph, editMonograph } = props;

  return (
    <Grid container spacing={2}>
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
                      marginRight: 2
                    }}
                    value={item.id}
                    onClick={() => editMonograph(idx)}
                  >
                    <ModeEditOutlineOutlinedIcon color='warning' fontSize='large'/>
                </IconButton>
                <IconButton 
                  edge='end' 
                  aria-label='delete_record'
                  sx={ {  
                    marginRight: 2
                  }}
                  value={item.id}
                  onClick={delMonograph}
                >
                  <HighlightOffOutlinedIcon color='error' fontSize='large'/>
                </IconButton>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </Grid>
  )
}
