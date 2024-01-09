import React, { useState } from 'react';
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
import { useAddGuestLectureMutation } from '../../../features/guestLectures/guestLectureApiSlice';
import { useUpdateGuestLectureMutation } from '../../../features/guestLectures/guestLectureApiSlice';
import '../../sharedStyle/ModalStyle.css'
import { MobilityActivityType } from '../../../_helpers/Enums';

export default function GuestLectureModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      city: '',
      topic: '',
      host_name: '',
      activity_type: '',
      start_date: '',
      end_date: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.topic && formData.host_name
      && formData.activity_type && formData.start_date
      && formData.end_date) 
      {
        return true;
      } else {
        return false;
      }
  }

  const getSelectedVal = MobilityActivityType.find(i => i.value === formData.activity_type)

  const handleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['activity_type']: event?.value })
    )
  }

  function HandleStartDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['start_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleEndDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['end_date']: value.format('YYYY-MM-DD') })
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addLecture, { isError: addLectureError }] = useAddGuestLectureMutation();

  const HandleAddLecture = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newLecture = await addLecture(formData).unwrap()
      setFormData ({
        city: '',
        topic: '',
        host_name: '',
        activity_type: '',
        start_date: '',
        end_date: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_lecture_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateLecture, {isError: updateLectureError}] = useUpdateGuestLectureMutation();

  const HandleUpateLecture = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedLecture = await updateLecture({ id, formData }).unwrap()
      setFormData ({
        city: '',
        topic: '',
        host_name: '',
        activity_type: '',
        start_date: '',
        end_date: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('update_patent_error', err)
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
              ? 'Добавление гостевой лекции и семинара:'
              : 'Редактироание гостевой лекции и семинара:'
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
              <div className='form-group mb-1'>
                <label 
                  htmlFor="topic" 
                  className='form-label fs-3'
                >
                  Тема:
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
                  htmlFor="host_name" 
                  className='form-label fs-3'
                >
                  Место проведения:
                </label>
                <input 
                  name='host_name' 
                  className='form-control fs-3' 
                  value={formData.host_name} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="activity_type"
                  className='form-label fs-3'
                >
                  Тип:
                </label>
                <Select
                  // ref={selectInputRef}
                  defaultValue={getSelectedVal}
                  onChange={handleSelectOption}
                  placeholder="Выберите тип" 
                  className='fs-4'
                  options={MobilityActivityType} 
                  isClearable={true}
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
                  id='start_date'
                  className='float-end'
                  value={dayjs(formData.start_date)}
                  onChange={(newValue) => HandleStartDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="end_date" 
                  className='form-label fs-3'
                >
                  Дата окончания:
                </label>
                <DatePicker 
                  name='end_date'
                  id='end_date'
                  className='float-end'
                  value={dayjs(formData.end_date)}
                  onChange={(newValue) => HandleEndDateChange(newValue)}
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
            onClick={defaultValue ? HandleUpateLecture : HandleAddLecture} 
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
