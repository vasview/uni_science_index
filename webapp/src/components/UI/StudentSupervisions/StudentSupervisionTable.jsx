import React from 'react';
import { Grid, IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export const StudentSupervisionTable = (props) => {
  const { stdWorks, delWork, editWork } = props;

  return (
    <Grid container spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>Тема работы</th>
            <th className='fs-4'>ФИО</th>
            <th className='fs-4'>№ группы</th>
            <th className='fs-4'>Год</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {stdWorks.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.topic}</td>
              <td className='fs-4'>{item.std_fullname}</td>
              <td className='fs-4'>{item.group_number}</td>
              <td className='fs-4'>{item.year}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2
                    }}
                    value={item.id}
                    onClick={() => editWork(idx)}
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
                  onClick={delWork}
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
