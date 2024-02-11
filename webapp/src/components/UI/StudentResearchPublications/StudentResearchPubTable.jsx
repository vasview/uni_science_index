import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export const StudentResearchPubTable = (props) => {
  const { stdPubs, delPub, editPub } = props;

  return (
    <Grid>
      {console.log('stdPubs', stdPubs)}
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>Тема НИРС</th>
            <th className='fs-4'>Название статьи</th>
            <th className='fs-4'>Издание</th>
            <th className='fs-4'>Дата</th>
            <th className='fs-4'>Местное</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {stdPubs.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.student_work_title}</td>
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
                    onClick={() => editPub(idx)}
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
                  onClick={delPub}
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
