import React from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { ThesisDefenceStatus } from '../../../_helpers/Enums';

export const ThesisDefenceTable = (props) => {
  const { thesises, delThesis, editThesis } = props;

  const thesisStatus = ((value) => {
    if (value) {
      return ThesisDefenceStatus.find(item => item.value === value).label
    }
})

  return (
    <Grid>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
          <th className='fs-4'>Тема диссертации</th>
            <th className='fs-4'>Дата защиты - План</th>
            <th className='fs-4'>Дата защиты - Факт</th>
            <th className='fs-4'>Статус</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {thesises.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.title}</td>
              <td className='fs-4'>{item.expected_end_date}</td>
              <td className='fs-4'>{item.real_end_date}</td>
              <td className='fs-4'>{thesisStatus(item.status)}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editThesis(idx)}
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
                  onClick={delThesis}
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
