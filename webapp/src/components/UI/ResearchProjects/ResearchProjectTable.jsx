import React from 'react';
import { Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { DoctoralResearchStatus, ProjectRole } from '../../../_helpers/Enums';

export const ResearchProjectTable = (props) => {
  const { projects, delProject, editProject } = props;

  const ResearchStatus = ((value) => {
    if (value) {
      return DoctoralResearchStatus.find(item => item.value === value).label
    }
  })

  return (
    <Grid spacing={2}>
      <table className='table table-light'>
        <thead>
          <tr className='text-center'>
            <th className='fs-4'>Тема научной работы</th>
            <th className='fs-4'>Роль в проекте</th>
            <th className='fs-4'>Источник финансирования</th>
            <th className='fs-4'>Длительность финансирования</th>
            <th className='fs-4'>Сумма финансирования</th>
            <th className='fs-4'>Дата начала</th>
            <th className='fs-4'>План. дата окончания</th>
            <th className='fs-4'>Факт. дата окончания</th>
            <th className='fs-4'>Полученные результаты</th>
            <th className='fs-4'>Результаты внедрения</th>
            <th className='fs-4'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item, idx) => 
            <tr className='align-middle' key={idx}>
              <td className='fs-4'>{item.name}</td>
              <td className='fs-4'>{item.role_in_project}</td>
              <td className='fs-4'>{item.fund_source}</td>
              <td className='fs-4'>{item.fund_duration}</td>
              <td className='fs-4'>{item.fund_amount}</td>
              <td className='fs-4'>{item.start_date}</td>
              <td className='fs-4'>{item.expected_end_date}</td>
              <td className='fs-4'>{item.real_end_date}</td>
              <td className='fs-4'>{item.developed_results}</td> 
              <td className='fs-4'>{item.implementation_results}</td>
              <td className='text-center'>
                <IconButton 
                    edge='end'  
                    aria-label='edit_record'
                    sx={ {  
                      marginRight: 2,
                      padding: 0
                    }}
                    value={item.id}
                    onClick={() => editProject(idx)}
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
                  onClick={delProject}
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
