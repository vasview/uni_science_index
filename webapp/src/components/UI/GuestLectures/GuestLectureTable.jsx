import React from 'react'
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { MobilityActivityType } from '../../../_helpers/Enums';

export const GuestLectureTable = (props) => {
  const { lectures, delLecture, editLecture } = props;

  const mobilityType = ((value) => {
      if (value) {
        return MobilityActivityType.find(item => item.value === value).label
      }
  })

  return (
    <Grid spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
          <th className='fs-4'>Тема</th>
            <th className='fs-4'>Город</th>
            <th className='fs-4'>Место проведения</th>
            <th className='fs-4'>Тип</th>
            <th className='fs-4'>Дата начала</th>
            <th className='fs-4'>Дата окончания</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.topic}</td>
              <td className='fs-4'>{item.city}</td>
              <td className='fs-4'>{item.host_name}</td>
              <td className='fs-4'>{mobilityType(item.activity_type)}</td>
              <td className='fs-4'>{item.start_date}</td>
              <td className='fs-4'>{item.end_date}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editLecture(idx)}
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
                  onClick={delLecture}
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
