import React from 'react'
import { Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { ConfParticipationType } from '../../../_helpers/Enums';

export const ConferenceTable = (props) => {
  const { conferences, delConference, editConference } = props;

  const paticipationType = ((value) => {
      if (value) {
        return ConfParticipationType.find(item => item.value === value).label
      }
  })

  return (
    <Grid spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>Название</th>
            <th className='fs-4'>Место проведения</th>
            <th className='fs-4'>Вид участия</th>
            <th className='fs-4'>Дата</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {conferences.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.name}</td>
              <td className='fs-4'>{item.host_name}</td>
              <td className='fs-4'>{paticipationType(item.participation_type)}</td>
              <td className='fs-4'>{item.date}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editConference(idx)}
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
                  onClick={delConference}
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
