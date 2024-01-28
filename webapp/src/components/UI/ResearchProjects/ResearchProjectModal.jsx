import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddResearchProjectMutation } from '../../../features/researchProjects/researchProjectApiSlice';
import { useUpdateResearchProjectMutation } from '../../../features/researchProjects/researchProjectApiSlice';
import { ProjectRole } from '../../../_helpers/Enums';

import '../../sharedStyle/ModalStyle.css'


export default function ResearchProjectModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      name: '',
      start_date: '',
      expected_end_date: '',
      real_end_date: '',
      role_in_project: '',
      fund_source: '',
      fund_amount: '',
      fund_duration: '',
      implementation_results: '',
      developed_results: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.name && formData.start_date
      && formData.expected_end_date && formData.real_end_date
      && formData.role_in_project && formData.fund_source
      && formData.fund_amount && formData.fund_duration
      && formData.implementation_results 
      && formData.developed_results) {
        return true;
      } else {
        return false;
      }
  }

  const getSelectedRole = ProjectRole.find(i => i.value === formData.role_in_project)

  const handleRoleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['role_in_project']: event?.value })
    )
  }

  function HandleStartDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['start_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleEndDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['expected_end_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleRealEndDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['real_end_date']: value.format('YYYY-MM-DD') })
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addProject, { isError: addProjectError }] = useAddResearchProjectMutation();

  const HandleAddProject = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newProject = await addProject(formData).unwrap()
      setFormData ({
        name: '',
        start_date: '',
        expected_end_date: '',
        real_end_date: '',
        role_in_project: '',
        fund_source: '',
        fund_amount: '',
        fund_duration: '',
        implementation_results: '',
        developed_results: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_project_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateProject, {isError: updateProjectrror}] = useUpdateResearchProjectMutation();

  const HandleUpateProject = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedProject = await updateProject({ id, formData }).unwrap()
      setFormData ({
        name: '',
        start_date: '',
        expected_end_date: '',
        real_end_date: '',
        role_in_project: '',
        fund_source: '',
        fund_amount: '',
        fund_duration: '',
        implementation_results: '',
        developed_results: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('update_project_error', err)
      setErrors(err.data.detail)
    }
  }

  return (
    <React.Fragment>
      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle>
          <Typography
            // variant='h4'
            sx={{ textAlign: 'center', fontSize: 24}}
          >
            {
              !defaultValue 
              ? 'Добавление научной работы:'
              : 'Редактирование НИР:'
            }
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            paddingLeft: 2,
            paddingRight: 2,
            marginRight: 2,
            marginLeft: 2
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
            <form className='w-100 mx-1 my-1'>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="name" 
                  className='form-label fs-3'
                >
                  Тема научной работы:
                </label>
                <textarea 
                  name='name' 
                  className='form-control fs-3' 
                  value={formData.topic} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="role_in_project"
                  className='form-label fs-3 w-50'
                >
                  Роль в проекте:
                </label>
                <Select
                  defaultValue={getSelectedRole}
                  onChange={handleRoleSelectOption}
                  placeholder="Выберите роль" 
                  className='fs-4 float-end w-50'
                  options={ProjectRole} 
                  isClearable={true}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="fund_source"
                  className='form-label fs-3'
                >
                  Источник финансирования:
                </label>
                <input 
                  name='fund_source' 
                  className='form-control fs-3' 
                  value={formData.fund_source} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-4'>
                <label 
                  htmlFor="fund_amount"
                  className='form-label fs-3 w-50'
                >
                  Сумма финансирования:
                </label>
                <input 
                  name='fund_amount' 
                  type='number'
                  className='form-control fs-3 float-end w-50' 
                  value={formData.fund_amount} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="fund_duration" 
                  className='form-label fs-3 w-50'
                > 
                  Срок финансирования (мес.):
                </label>
                <input 
                  name='fund_duration' 
                  type='number'
                  className='form-control fs-3 float-end w-50' 
                  value={formData.fund_duration} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="developed_results" 
                  className='form-label fs-3'
                >
                  Полученные результаты:
                </label>
                <textarea 
                  name='developed_results' 
                  type='number'
                  className='form-control fs-3' 
                  value={formData.developed_results} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="implementation_results" 
                  className='form-label fs-3'
                >
                  Результаты внедрения:
                </label>
                <textarea 
                  name='implementation_results' 
                  type='number'
                  className='form-control fs-3' 
                  value={formData.implementation_results} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="start_date" 
                  className='form-label fs-3'
                >
                  Дата начала:
                </label>
                <DatePicker 
                  name='start_date'
                  className='float-end'
                  value={dayjs(formData.start_date)}
                  onChange={(newValue) => HandleStartDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="expected_end_date" 
                  className='form-label fs-3'
                >
                  Дата окончания (план):
                </label>
                <DatePicker 
                  name='expected_end_date'
                  id='end_date'
                  className='float-end'
                  value={dayjs(formData.expected_end_date)}
                  onChange={(newValue) => HandleEndDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="real_end_date" 
                  className='form-label fs-3'
                >
                  Дата окончания (факт):
                </label>
                <DatePicker 
                  name='real_end_date'
                  id='end_date'
                  className='float-end'
                  value={dayjs(formData.real_end_date)}
                  onChange={(newValue) => HandleRealEndDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
            </form>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions
          sx={{
            marginLeft: 5,
            marginRight: 5
          }}
        >
          <Button 
            variant='outlined'
            size='small'
            onClick={defaultValue ? HandleUpateProject : HandleAddProject} 
            sx={{ 
              fontSize: 14,
              flexGrow: 1
            }}
          >
            Сохранить
          </Button>
          <Button 
            variant='outlined'
            size='small'
            onClick={closeModal} 
            sx={{ 
              fontSize: 14,
              flexGrow: 1
            }}
          >
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
