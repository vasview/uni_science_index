import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './employeeStyle.css'
import { Link } from 'react-router-dom';

function Employees() {
  const tblTitles = [
    '#', 'ФИО сотрудника',
    'Кол-во защит диссертаций', 'Кол-во докторантов, аспирантов', 'Руководство НИРС',
    'Публикация монографии', 'Получение авторских свидетельств', 'Кол-во заявок/патентов Кыргызтан', 
    'Кол-во заявок/патентов зарубеж.', 'Статьи в РИНЦ', 'Статьи в Web of Science', 
    'Статьи в КР и зарубежом', 'Кол-во финансируемых НИР', 'Руководитель / исполнитель НИР МОиН КР',
    'Руководитель / исполнитель зарубеж. НИР', 'Кол-во научно-технических разработок', 
    'Доклады в научных форумах', 'Кол-во стажировок, гостевых лекций'
  ]

  const empl1 = [
    '1', '0', '2', '3', '5', '0', 
    '0', '2', '1', '2', '2', '0',
    '2', '0', '3', '3'
  ]
  const empl2 = [
    '0', '3', '1', '0', '3', '0', 
    '2', '1', '1', '4', '2', '1',
    '0', '2', '0', '3'
  ]

  const empl3 = [
    '1', '2', '3', '2', '1', '1', 
    '4', '2', '0', '3', '0', '2',
    '1', '0', '1', '0'
  ]
  return (
    <Container fluid>
    <div className='row'>
      <div className='col col-md-6'>
        <h2 className='employee_title' style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>Мои сотрудники</h2>
      </div>
      <div className='col col-md-6 btn-block'>
        <Button className='btn_add_employee'>Добавить сотрудника</Button>
      </div>
    </div>
      <Table responsive>
        <thead>
          <tr>
            {tblTitles.map((title, index) => (
              <th key={index} className=''>
                <div><span>{title}</span></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className='infoRow'>
            <td>1</td>
            <td>
              <Link to="/employees_card">
                <div className='FIO-cell'>Cотрудник номер 1</div>
              </Link>
            </td>
            {empl1.map((num, index) => (
              <td key={index} className='info-cell'> {num}</td>
            ))}
          </tr>
          <tr className='infoRow'>
            <td>2</td>
            <td>
              <Link to="/employees_card">
                <div className='FIO-cell'>Cотрудник номер 2</div>
              </Link>
            </td>
            {empl2.map((num, index) => (
              <td key={index} className='info-cell'>{num}</td>
            ))}
          </tr>
          <tr className='infoRow'>
            <td>3</td>
            <td>
              <Link to="/employees_card">
                <div className='FIO-cell'>Cотрудник номер 2</div>
              </Link>
            </td>
            {empl3.map((num, index) => (
              <td key={index} className='info-cell'>{num}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default Employees