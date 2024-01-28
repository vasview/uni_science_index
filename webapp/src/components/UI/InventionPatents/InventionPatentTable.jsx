import { Grid, IconButton } from '@mui/material'
import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export const InventionPatentTable = (props) => {
  const { patents, delPatent, editPatent } = props;
  return (
    <Grid spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>№</th>
            <th className='fs-4'>Описание</th>
            <th className='fs-4'>Тип патента</th>
            <th className='fs-4'>Дата выдачи</th>
            <th className='fs-4'>Дата окончания</th>
            <th className='fs-4'>Местный</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {patents.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.number}</td>
              <td className='fs-4'>{item.description}</td>
              <td className='fs-4'>{item.patent_type}</td>
              <td className='fs-4'>{item.issued_date}</td>
              <td className='fs-4'>{item.valid_to}</td>
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
                    onClick={() => editPatent(idx)}
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
                  onClick={delPatent}
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
