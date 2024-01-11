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
import { useAddThesisDefenceMutation } from '../../../features/thesisDefence/thesisDefenceApiSlice';
import { useUpdateThesisDefenceMutation } from '../../../features/thesisDefence/thesisDefenceApiSlice';
import { ThesisDefenceStatus } from '../../../_helpers/Enums';
import '../../sharedStyle/ModalStyle.css'

export default function ThesisDefenceModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      title: '',
      expected_end_date: '',
      real_end_date: '',
      status: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.title && formData.expected_end_date
      && formData.real_end_date && formData.status) {
        return true;
      } else {
        return false;
      }
  }

  const getSelectedVal = ThesisDefenceStatus.find(i => i.value === formData.status)

  const handleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['status']: event?.value })
    )
  }

  function HandleExpectedDateChange(value) {
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

  const [addThesis, { isError: addThesisError }] = useAddThesisDefenceMutation();

  const HandleAddThesis = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newThesis = await addThesis(formData).unwrap()
      setFormData ({
        title: '',
        expected_end_date: '',
        real_end_date: '',
        status: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_thesis_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateThesis, {isError: updateThesisError}] = useUpdateThesisDefenceMutation();

  const HandleUpateThesis = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedThesis = await updateThesis({ id, formData }).unwrap()
      setFormData ({
        title: '',
        expected_end_date: '',
        real_end_date: '',
        status: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('update_thesis_error', err)
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
              ? 'Добавление диссертации:'
              : 'Редактироание диссертации:'
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
                  htmlFor="title" 
                  className='form-label fs-3'
                >
                  Тема диссертации:
                </label>
                <textarea 
                  name='title' 
                  className='form-control fs-3' 
                  value={formData.title} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="status"
                  className='form-label fs-3'
                >
                  Статус:
                </label>
                <Select
                  defaultValue={getSelectedVal}
                  onChange={handleSelectOption}
                  placeholder="Выберите статус" 
                  className='fs-4 float-end w-50'
                  // maxMenuHeight={120}
                  options={ThesisDefenceStatus} 
                  isClearable={true}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="expected_end_date" 
                  className='form-label fs-3'
                >
                  Планируемая дата защиты:
                </label>
                <DatePicker 
                  name='expected_end_date'
                  className='float-end'
                  value={dayjs(formData.expected_end_date)}
                  onChange={(newValue) => HandleExpectedDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="real_end_date"
                  className='form-label fs-3'
                >
                  Фактическая дата защиты:
                </label>
                <DatePicker
                  name='real_end_date'
                  className='float-end'
                  value={dayjs(formData.real_end_date)}
                  onChange={(newValue) => HadleRealDateChange(newValue)}
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
            onClick={defaultValue ? HandleUpateThesis : HandleAddThesis} 
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
