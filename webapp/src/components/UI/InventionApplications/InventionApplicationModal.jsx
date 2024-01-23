import React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAddInventionAplMutation } from '../../../features/inventionApplications/inventionAplApiSlice';
import { useUpdateInventionAplMutation } from '../../../features/inventionApplications/inventionAplApiSlice';
import '../../sharedStyle/ModalStyle.css'

export default function InventionApplicationModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      registration_number: '',
      description: '',
      application_date: '',
      application_type: '',
      organization: '',
      is_local: true
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.registration_number && formData.description
      && formData.application_date && formData.application_type
      && formData.organization) {
        return true;
      } else {
        return false;
      }
  }

  function HadleAplDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['application_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HadleAplCheckBoxChange(event) {
    setFormData(
      (prevFormData) => ({...prevFormData,['is_local']: event.target.checked })
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addInventionApl, { isError: addAplError }] = useAddInventionAplMutation();

  const HandleAddApl = async (event) => {
    event.preventDefault()
    
    console.log('add application', formData)
    console.log('form valid', validateForm())
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newInventionApl = await addInventionApl(formData).unwrap()
      setFormData ({
        registration_number: '',
        description: '',
        application_date: '',
        application_type: '',
        organization: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('add_invention_apl_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateInventionApl, {isError: updateAplError}] = useUpdateInventionAplMutation();

  const HandleUpateApl = async (event) => {
    const id = defaultValue.id

    console.log('update apl', formData)

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedCertificate = await updateInventionApl({ id, formData }).unwrap()
      setFormData ({
        registration_number: '',
        description: '',
        application_date: '',
        application_type: '',
        organization: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('update_invention_apl_error', err)
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
              ? 'Добавление заявки на изобретение:'
              : 'Редактирование заявки на изобретение:'
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
                  htmlFor="description" 
                  className='form-label fs-3'
                >
                  Описание:
                </label>
                <textarea 
                  name='description' 
                  className='form-control fs-3' 
                  value={formData.description} 
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
                  onChange={(newValue) => HadleAplDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="application_type"
                  className='form-label fs-3'
                >
                  Тип заявки:
                </label>
                <input 
                  name='application_type' 
                  className='form-control fs-3' 
                  value={formData.application_type} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label 
                  htmlFor="organization"
                  className='form-label fs-3'
                >
                  Организация:
                </label>
                <input 
                  name='organization' 
                  className='form-control fs-3' 
                  value={formData.organization}
                  onChange={handleChange}
                />
              </div>
              <div className='form-group'>
                <label 
                  htmlFor="is_local"
                  className='form-label fs-3'
                >
                  Местная:
                </label>
                <Checkbox 
                  name='is_local'
                  checked={formData.is_local} 
                  onChange={HadleAplCheckBoxChange}
                  className='float-end'
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
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
            onClick={defaultValue ? HandleUpateApl : HandleAddApl} 
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
