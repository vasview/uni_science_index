import React from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { DoctoralResearchStatus } from '../../../_helpers/Enums';

export const DoctoralSupervisionTable = (props) => {
  const { docWorks, delWork, editWork } = props;

  const ResearchStatus = ((value) => {
    if (value) {
      return DoctoralResearchStatus.find(item => item.value === value).label
    }
  })

  return (
    <Grid>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>Тема диссертационной работы</th>
            <th className='fs-4'>ФИО</th>
            <th className='fs-4'>Дата поступления</th>
            <th className='fs-4'>План. дата окончания</th>
            <th className='fs-4'>Факт. дата окончания</th>
            <th className='fs-4'>Статус</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {docWorks.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.topic}</td>
              <td className='fs-4'>{item.std_fullname}</td>
              <td className='fs-4'>{item.admition_date}</td>
              <td className='fs-4'>{item.expected_end_date}</td>
              <td className='fs-4'>{item.real_end_date}</td>
              <td className='fs-4'>{ResearchStatus(item.status)}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editWork(idx)}
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
                  onClick={delWork}
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
