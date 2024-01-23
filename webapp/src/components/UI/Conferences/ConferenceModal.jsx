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
import { useAddConferenceMutation } from '../../../features/conferences/conferenceApiSlice';
import { useUpdateConferenceMutation } from '../../../features/conferences/conferenceApiSlice';
import '../../sharedStyle/ModalStyle.css'
import { ConfParticipationType } from '../../../_helpers/Enums';

// const ConfParticipationType = [
//   { value: 1, label: 'доклад' },
//   { value: 2, label: 'экспонат' }
// ]

export default function ConferenceModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      name: '',
      host_name: '',
      participation_type: '',
      date: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.name && formData.host_name
      && formData.participation_type && formData.date) 
      {
        return true;
      } else {
        return false;
      }
  }

  const getSelectedVal = ConfParticipationType.find(i => i.value === formData.participation_type)

  const handleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['participation_type']: event?.value })
    )
  }

  function HadleDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['date']: value.format('YYYY-MM-DD') })
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addConference, { isError: addConferenceError }] = useAddConferenceMutation();

  const HandleAddConference = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newConference = await addConference(formData).unwrap()
      setFormData ({
        name: '',
        host_name: '',
        participation_type: '',
        date: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_conference_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateConference, {isError: updateConferenceError}] = useUpdateConferenceMutation();

  const HandleUpateConference = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedConference = await updateConference({ id, formData }).unwrap()
      setFormData ({
        name: '',
        host_name: '',
        participation_type: '',
        date: ''
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
              ? 'Добавление семинара и конференции:'
              : 'Редактирование семинара и конференции:'
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
                  htmlFor="name" 
                  className='form-label fs-3'
                >
                  Название:
                </label>
                <textarea 
                  name='name' 
                  className='form-control fs-3' 
                  value={formData.name} 
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
                  htmlFor="participation_type"
                  className='form-label fs-3'
                >
                  Вид участия:
                </label>
                <Select
                  // ref={selectInputRef}
                  defaultValue={getSelectedVal}
                  onChange={handleSelectOption}
                  placeholder="Выберите вид участия" 
                  className='fs-4'
                  options={ConfParticipationType} 
                  isClearable={true}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="issued_date" 
                  className='form-label fs-3'
                >
                  Дата проведения:
                </label>
                <DatePicker 
                  name='date'
                  id='date'
                  className='float-end'
                  value={dayjs(formData.date)}
                  onChange={(newValue) => HadleDateChange(newValue)}
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
            onClick={defaultValue ? HandleUpateConference : HandleAddConference} 
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
