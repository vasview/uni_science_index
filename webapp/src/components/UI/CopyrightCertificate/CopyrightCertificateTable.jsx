import { Grid, IconButton } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export const CopyrightCertificateTable = (props) => {
  const { certificates, delCertificate, editCertificate } = props;

  return (
    <Grid>
      <table className='table table-light'>
        <thead>
          <tr className='text-center align-middle'>
            <th className='fs-4'>№</th>
            <th className='fs-4'>Название</th>
            <th className='fs-4'>Дата заявки</th>
            <th className='fs-4'>Дата выдачи</th>
            <th className='fs-4'>Кем выдано</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((item, idx) => 
            <tr className='align-top' key={idx}>
              <td className='fs-4'>{item.registration_number}</td>
              <td className='fs-4'>{item.title}</td>
              <td className='fs-4'>{item.application_date}</td>
              <td className='fs-4'>{item.issued_date}</td>
              <td className='fs-4'>{item.issued_by}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editCertificate(idx)}
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
                  onClick={delCertificate}
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
