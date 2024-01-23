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
import { useAddStudentWorkMutation } from '../../../features/studentWorks/studentWorkApiSlice';
import { useUpdateStudentWorkMutation } from '../../../features/studentWorks/studentWorkApiSlice';
import '../../sharedStyle/ModalStyle.css'


export default function StudentSupervisionModal({ closeModal, openModal, defaultValue }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      topic: '',
      std_first_name: '',
      std_middle_name: '',
      std_last_name: '',
      group_number: '',
      year: ''
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.topic && formData.std_first_name
      && formData.std_last_name && formData.group_number
      && formData.year) {
        return true;
      } else {
        return false;
      }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const [addStdWork, { isError: addStdWorkError }] = useAddStudentWorkMutation();

  const HandleAddStdWork = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newStdWork = await addStdWork(formData).unwrap()
      setFormData ({
        topic: '',
        std_first_name: '',
        std_middle_name: '',
        std_last_name: '',
        group_number: '',
        year: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('add_std_work_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateStdWork, {isError: updateDocWorkrror}] = useUpdateStudentWorkMutation();

  const HandleUpateStdWork = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedStdWork = await updateStdWork({ id, formData }).unwrap()
      setFormData ({
        topic: '',
        std_first_name: '',
        std_middle_name: '',
        std_last_name: '',
        group_number: '',
        year: ''
      })
    
      closeModal();
    } catch (err) {
      console.log('update_std_work_error', err)
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
              ? 'Добавление научной работы студента:'
              : 'Редактирование научной работы студента:'
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
                  Тема работы:
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
                  Имя студента:
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
                  Отчество студента:
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
                  Фамилия студента:
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
                  htmlFor="group_number" 
                  className='form-label fs-3'
                >
                  Номер группы:
                </label>
                <input 
                  name='group_number' 
                  className='form-control fs-3' 
                  value={formData.group_number} 
                  onChange={handleChange}
                />
              </div>
              <div className='form-group mb-4'>
                <label 
                  htmlFor="year" 
                  className='form-label fs-3'
                >
                  Год обучения:
                </label>
                <input 
                  name='year' 
                  type='number'
                  className='form-control fs-3' 
                  value={formData.year} 
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
            onClick={defaultValue ? HandleUpateStdWork : HandleAddStdWork} 
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
