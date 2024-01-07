import React from 'react'
import { Grid, IconButton } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

export const InventionApplicationTable = (props) => {
  const { applications, delApplication, editApplication } = props;
  return (
    <Grid container spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>№</th>
            <th className='fs-4'>Описание</th>
            <th className='fs-4'>Дата заявки</th>
            <th className='fs-4'>Тип заявки</th>
            <th className='fs-4'>Организация</th>
            <th className='fs-4'>Местная</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.registration_number}</td>
              <td className='fs-4'>{item.description}</td>
              <td className='fs-4'>{item.application_date}</td>
              <td className='fs-4'>{item.application_type}</td>
              <td className='fs-4'>{item.organization}</td>
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
                    onClick={() => editApplication(idx)}
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
                  onClick={delApplication}
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
