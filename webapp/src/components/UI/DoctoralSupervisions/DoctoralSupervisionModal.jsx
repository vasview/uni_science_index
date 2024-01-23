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
import { useAddDoctoralWorkMutation } from '../../../features/DoctoralWorks/doctoralWorkApiSlice';
import { useUpdateDoctoralWorkMutation } from '../../../features/DoctoralWorks/doctoralWorkApiSlice';
import '../../sharedStyle/ModalStyle.css'
import { DoctoralResearchStatus } from '../../../_helpers/Enums';

export default function DoctoralSupervisionModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      topic: '',
      std_first_name: '',
      std_middle_name: '',
      std_last_name: '',
      admition_date: '',
      expected_end_date: '',
      status: '',
      real_end_date: null
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.topic && formData.std_first_name
      && formData.std_last_name && formData.admition_date
      && formData.expected_end_date && formData.status) {
        return true;
      } else {
        return false;
      }
  }

  const getSelectedVal = DoctoralResearchStatus.find(i => i.value === formData.status)

  const handleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['status']: event?.value })
    )
  }

  function HandleAdminitionDateChange(value) {
    setFormData(
      (prevFormData) => ({ ...prevFormData,['admition_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleExpectedEndDateChange(value) {
    setFormData(
      (prevFormData) => ({ ...prevFormData,['expected_end_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HadleRealDateChange(value) {
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

  const [addDocWork, { isError: addDocWorkError }] = useAddDoctoralWorkMutation();

  const HandleAddDocWork = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newDocWork = await addDocWork(formData).unwrap()
      setFormData ({
        topic: '',
        std_first_name: '',
        std_middle_name: '',
        std_last_name: '',
        admition_date: '',
        expected_end_date: '',
        status: '',
        real_end_date: null
      })
    
      closeModal();
    } catch (err) {
      console.log('add_doctoral_work_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateDocWork, {isError: updateDocWorkrror}] = useUpdateDoctoralWorkMutation();

  const HandleUpateDocWork = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedDocWork = await updateDocWork({ id, formData }).unwrap()
      setFormData ({
        topic: '',
        std_first_name: '',
        std_middle_name: '',
        std_last_name: '',
        admition_date: '',
        expected_end_date: '',
        status: '',
        real_end_date: null
      })
    
      closeModal();
    } catch (err) {
      console.log('update_doctoral_work_error', err)
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
              ? 'Добавление аспиратна/докторанта:'
              : 'Редактирование аспиратна/докторанта:'
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
                  htmlFor="topic" 
                  className='form-label fs-3'
                >
                  Тема диссертации:
                </label>
                <textarea 
                  name='topic' 
                  className='form-control fs-3' 
                  value={formData.topic} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="std_first_name"
                  className='form-label fs-3'
                >
                  Имя аспиратна/докторанта:
                </label>
                <input 
                  name='std_first_name' 
                  className='form-control fs-3' 
                  value={formData.std_first_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="std_middle_name"
                  className='form-label fs-3'
                >
                  Отчество аспиратна/докторанта:
                </label>
                <input 
                  name='std_middle_name' 
                  className='form-control fs-3' 
                  value={formData.std_middle_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="std_last_name"
                  className='form-label fs-3'
                >
                  Фамилия аспиратна/докторанта:
                </label>
                <input 
                  name='std_last_name' 
                  className='form-control fs-3' 
                  value={formData.std_last_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-4'>
                <label 
                  htmlFor="admition_date" 
                  className='form-label fs-3'
                >
                  Дата поступления:
                </label>
                <DatePicker 
                  name='admition_date'
                  className='float-end'
                  value={dayjs(formData.admition_date)}
                  onChange={(newValue) => HandleAdminitionDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-4'>
                <label 
                  htmlFor="expected_end_date" 
                  className='form-label fs-3'
                >
                  План. дата окончания
                </label>
                <DatePicker 
                  name='expected_end_date'
                  className='float-end'
                  value={dayjs(formData.expected_end_date)}
                  onChange={(newValue) => HandleExpectedEndDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-4'>
                <label 
                  htmlFor="real_end_date"
                  className='form-label fs-3'
                >
                  Факт. дата окончания:
                </label>
                <DatePicker
                  name='real_end_date'
                  className='float-end'
                  value={dayjs(formData.real_end_date)}
                  onChange={(newValue) => HadleRealDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="status"
                  className='form-label fs-3'
                >
                  Статус работы:
                </label>
                <Select
                  // ref={selectInputRef}
                  defaultValue={getSelectedVal}
                  onChange={handleSelectOption}
                  placeholder="Выберите статус" 
                  className='fs-4'
                  options={DoctoralResearchStatus} 
                  isClearable={true}
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
            onClick={defaultValue ? HandleUpateDocWork : HandleAddDocWork} 
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
