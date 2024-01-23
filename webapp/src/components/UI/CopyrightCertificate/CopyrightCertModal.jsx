import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddCopyrightCertMutation } from '../../../features/copyrightCertifications/copyrightCertApiSlice';
import { useUpdateCopyrightCertMutation } from '../../../features/copyrightCertifications/copyrightCertApiSlice';
import '../../sharedStyle/ModalStyle.css'

export default function CopyrightCertModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      registration_number: '',
      title: '',
      application_date: '',
      issued_date: '',
      issued_by: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.registration_number && formData.title
      && formData.application_date && formData.issued_date
      && formData.issued_by) {
        return true;
      } else {
        return false;
      }
  }

  function HandleIssuedDateChange(value) {
    setFormData(
      (prevFormData) => ({ ...prevFormData,['issued_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleAplDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['application_date']: value.format('YYYY-MM-DD') })
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addCopyrightCert, { isError: addCertError }] = useAddCopyrightCertMutation();

  const HandleAddCert = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newCertificate = await addCopyrightCert(formData).unwrap()
      setFormData ({
        registration_number: '',
        title: '',
        application_date: '',
        issued_date: '',
        issued_by: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_cert_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateCopyrightCert, {isError: updateCertError}] = useUpdateCopyrightCertMutation();

  const HandleUpateCert = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedCertificate = await updateCopyrightCert({ id, formData }).unwrap()
      setFormData ({
        registration_number: '',
        title: '',
        application_date: '',
        issued_date: '',
        issued_by: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('update_cert_error', err)
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
              ? 'Добавление авторского свидетельства:'
              : 'Редактирование авторского свидетельства:'
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
                  htmlFor="registration_number" 
                  className='form-label fs-3'
                >
                  Регистр. номер:
                </label>
                <input 
                  name='registration_number' 
                  className='form-control fs-3' 
                  value={formData.registration_number} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="title" 
                  className='form-label fs-3'
                >
                  Название:
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
                  htmlFor="application_date" 
                  className='form-label fs-3'
                >
                  Дата заявки:
                </label>
                <DatePicker 
                  name='application_date'
                  id='copyright_apl_date'
                  className='float-end'
                  value={dayjs(formData.application_date)}
                  onChange={(newValue) => HandleAplDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="issued_date"
                  className='form-label fs-3'
                >
                  Дата выдачи:
                </label>
                <DatePicker
                  name='issued_date'
                  className='float-end'
                  value={dayjs(formData.issued_date)}
                  onChange={(newValue) => HandleIssuedDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group'>
                <label 
                  htmlFor="issued_by"
                  className='form-label fs-3'
                >
                  Кем выдано:
                </label>
                <input 
                  name='issued_by' 
                  className='form-control fs-3' 
                  value={formData.issued_by}
                  onChange={handleChange}
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
            onClick={defaultValue ? HandleUpateCert : HandleAddCert} 
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
