import React from 'react'
import { Container, Typography } from '@mui/material'
import './EmployeeCard.css'


const EmployeeCard = () => {
  return (
    <Container>
      <Typography 
        pt={1} 
        component='div' 
        variant='h3'
      >
        Показатели научной работы сотрудника
      </Typography>
      <Typography 
        pt={1}
        component='div' 
        variant='h4'
      >
        ФИО сотрудника
      </Typography>
      <table className='employee_info_tbl'>
        <thead>
          <tr>
            <th>
              <Typography variant='h4'>
                Показатель
              </Typography>
            </th>
            <th>
              <Typography variant='h4'>
                Текущий год
              </Typography>
            </th>
            <th>
              <Typography variant='h4'>
                Прошлый год
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во защит диссертаций
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во докторантов, аспирантов
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Руководство НИРС
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Публикация монографии
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Получение авторских свидетельств
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во заявок / патентов Кыргызтан
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>      
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во заявок/патентов зарубеж.
              </Typography>
            </td>
            <td className='index_value'>0</td>
            <td className='index_value'>0</td>
          </tr>    
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Статьи в РИНЦ
              </Typography>
            </td>
            <td className='index_value'>2</td>
            <td className='index_value'>1</td>
          </tr>   
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Статьи в Web of Science'
              </Typography>
            </td>
            <td className='index_value'>3</td>
            <td className='index_value'>1</td>
          </tr> 
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Статьи в КР и зарубежом
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>1</td>
          </tr> 
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во финансируемых НИР
              </Typography>
            </td>
            <td className='index_value'>2</td>
            <td className='index_value'>0</td>
          </tr> 
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Руководитель / исполнитель НИР МОиН КР
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>1</td>
          </tr>     
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Руководитель / исполнитель зарубеж. НИР
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>       
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во научно-технических разработок
              </Typography>
            </td>
            <td className='index_value'>1</td>
            <td className='index_value'>0</td>
          </tr>   
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Доклады в научных форумах
              </Typography>
            </td>
            <td className='index_value'>2</td>
            <td className='index_value'>0</td>
          </tr>  
          <tr>
            <td>
              <Typography variant='h5' sx={{ fontStyle:'italic'}}>
                Кол-во стажировок, гостевых лекций
              </Typography>
            </td>
            <td className='index_value'>0</td>
            <td className='index_value'>0</td>
          </tr>   
        </tbody>
      </table>
      
    </Container>
  )
}

export default EmployeeCard