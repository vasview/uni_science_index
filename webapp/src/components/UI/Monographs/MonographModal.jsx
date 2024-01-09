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
import { useAddMonographMutation } from '../../../features/monographs/monographApiSlice';
import { useUpdateMonographMutation } from '../../../features/monographs/monographApiSlice';
import '../../sharedStyle/ModalStyle.css'

export default function MonographModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      name: '',
      place: '',
      publication_date: '',
      is_local: true
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.name && formData.place
      && formData.publication_date) {
        return true;
      } else {
        return false;
      }
  }

  function HandlePubDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['publication_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HandleCheckBoxChange(event) {
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

  const [addMonograph, { isError: addMonographError }] = useAddMonographMutation();

  const HandleAddMonograph = async (event) => {
    event.preventDefault()
    
    console.log('add patent', formData)
    console.log('form valid', validateForm())
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newMonograph = await addMonograph(formData).unwrap()
      setFormData ({
        name: '',
        place: '',
        publication_date: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('add_patent_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateMonograph, {isError: updatePatentError}] = useUpdateMonographMutation();

  const HandleUpateMonograph = async (event) => {
    const id = defaultValue.id

    console.log('update monograph', formData)

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedMonograph = await updateMonograph({ id, formData }).unwrap()
      setFormData ({
        name: '',
        place: '',
        publication_date: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('update_monograph_error', err)
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
              ? 'Добавление публикации монографии:'
              : 'Редактироание публикации монографии:'
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
                  Название монографии:
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
                  htmlFor="place" 
                  className='form-label fs-3'
                >
                  Издание:
                </label>
                <input 
                  name='place' 
                  className='form-control fs-3' 
                  value={formData.place} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="publication_date" 
                  className='form-label fs-3'
                >
                  Дата публикации:
                </label>
                <DatePicker 
                  name='publication_date'
                  className='float-end'
                  value={dayjs(formData.publication_date)}
                  onChange={(newValue) => HandlePubDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group'>
                <label 
                  htmlFor="is_local"
                  className='form-label fs-3'
                >
                  Местное:
                </label>
                <Checkbox 
                  name='is_local'
                  checked={formData.is_local} 
                  onChange={HandleCheckBoxChange}
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
            onClick={defaultValue ? HandleUpateMonograph : HandleAddMonograph} 
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
