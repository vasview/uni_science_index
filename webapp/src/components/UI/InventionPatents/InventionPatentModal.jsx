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
import { useAddInventionPatentMutation } from '../../../features/inventionPatents/inventionPatentApiSlice';
import { useUpdateInventionPatentMutation } from '../../../features/inventionPatents/inventionPatentApiSlice';
import '../../sharedStyle/ModalStyle.css'

export default function InventionPatentModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      number: '',
      description: '',
      patent_type: '',
      issued_date: '',
      valid_to: '',
      is_local: true
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.number && formData.description
      && formData.issued_date && formData.valid_to
      && formData.patent_type) {
        return true;
      } else {
        return false;
      }
  }

  function HadleIssuedDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['issued_date']: value.format('YYYY-MM-DD') })
    )
  }

  function HadleValidDateChange(value) {
    setFormData(
      (prevFormData) => ({...prevFormData,['valid_to']: value.format('YYYY-MM-DD') })
    )
  }

  function HadleCheckBoxChange(event) {
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

  const [addInventionPatent, { isError: addPatentError }] = useAddInventionPatentMutation();

  const HandleAddPatent = async (event) => {
    event.preventDefault()
    
    console.log('add patent', formData)
    console.log('form valid', validateForm())
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newInventionPatent = await addInventionPatent(formData).unwrap()
      setFormData ({
        number: '',
        description: '',
        patent_type: '',
        issued_date: '',
        valid_to: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('add_patent_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updatePatent, {isError: updatePatentError}] = useUpdateInventionPatentMutation();

  const HandleUpatePatent = async (event) => {
    const id = defaultValue.id

    console.log('update patent', formData)

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedPatent = await updatePatent({ id, formData }).unwrap()
      setFormData ({
        number: '',
        description: '',
        patent_type: '',
        issued_date: '',
        valid_to: '',
        is_local: true
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
              ? 'Добавление патента на изобретение:'
              : 'Редактироание патента на изобретение:'
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
                  htmlFor="number" 
                  className='form-label fs-3'
                >
                  Регистр. номер:
                </label>
                <input 
                  name='number' 
                  className='form-control fs-3' 
                  value={formData.number} 
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
              <div className='form-group mb-3'>
                <label 
                  htmlFor="patent_type"
                  className='form-label fs-3'
                >
                  Тип патента:
                </label>
                <input 
                  name='patent_type' 
                  className='form-control fs-3' 
                  value={formData.patent_type} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="issued_date" 
                  className='form-label fs-3'
                >
                  Дата выдачи:
                </label>
                <DatePicker 
                  name='valid_to'
                  id='issued_date'
                  className='float-end'
                  value={dayjs(formData.issued_date)}
                  onChange={(newValue) => HadleIssuedDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
                />
              </div>
              <div className='form-group mb-5'>
                <label 
                  htmlFor="valid_to" 
                  className='form-label fs-3'
                >
                  Дата окончания:
                </label>
                <DatePicker 
                  name='valid_to'
                  id='valid_to'
                  className='float-end'
                  value={dayjs(formData.valid_to)}
                  onChange={(newValue) => HadleValidDateChange(newValue)}
                  slotProps={{ textField: { variant: 'outlined' } }}
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
                  onChange={HadleCheckBoxChange}
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
            onClick={defaultValue ? HandleUpatePatent : HandleAddPatent} 
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
