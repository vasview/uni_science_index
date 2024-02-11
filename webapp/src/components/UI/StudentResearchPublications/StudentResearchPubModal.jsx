import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';
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
import { useAddStudentResearchPubMutation } from '../../../features/studentResearchPubs/studentPubApiSlice';
import { useUpdateStudentResearchPubMutation } from '../../../features/studentResearchPubs/studentPubApiSlice';
import '../../sharedStyle/ModalStyle.css'


export default function StudentResearchPubModal({ closeModal, openModal, 
                                                  defaultValue, studentWorkOptions }) {
// console.log('defaultValue', defaultValue)
  const [formData, setFormData] = useState(
    defaultValue || {
      student_research: '',
      name: '',
      place: '',
      publication_date: '',
      is_local: true
    }
  );

  const [errors, setErrors] = useState('');

  const validateForm = () => {
    if (formData.name && formData.student_research
      && formData.place && formData.publication_date) 
      {
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
    console.log(event)
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

  const getSelectedVal = studentWorkOptions.find(i => i.value === formData.student_research)

  const handleSelectOption = (event) => {
    setFormData(
      (prevFormData) => ({...prevFormData,['student_research']: event?.value })
    )
  }

  const [addStdPub, { isError: addStdPubError }] = useAddStudentResearchPubMutation();

  const HandleAddStdPub = async (event) => {
    event.preventDefault()
    
    console.log(formData)
    if (!validateForm()) {
      console.log('form_invalid for add pubs')
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const newStdPub = await addStdPub(formData).unwrap()
      setFormData ({
        student_research: '',
        name: '',
        place: '',
        publication_date: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('add_std_pub_error', err)
      setErrors(err.data.detail)
    }
  }

  const [updateStdPub, {isError: updateStdPubError}] = useUpdateStudentResearchPubMutation();

  const HandleUpateStdPub = async (event) => {
    const id = defaultValue.id

    if (!validateForm()) {
      // closeModal();  //TODO think about the behaviour
      return;
    }
    try {
      const updatedStdPub = await updateStdPub({ id, formData }).unwrap()
      setFormData ({
        student_research: '',
        name: '',
        place: '',
        publication_date: '',
        is_local: true
      })
    
      closeModal();
    } catch (err) {
      console.log('update_std_pub_error', err)
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
              ? 'Добавление публикации по итогам НИРС:'
              : 'Редактирование публикации по итогам НИРС:'
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
                    htmlFor="student_research"
                    className='form-label fs-3'
                  >
                    Тема НИРС:
                  </label>
                  <Select
                    // ref={selectInputRef}
                    defaultValue={getSelectedVal}
                    onChange={handleSelectOption}
                    placeholder="Выберите тему НИРС" 
                    className='fs-4'
                    options={studentWorkOptions} 
                    isClearable={true}
                  />
                </div>
              <div className='form-group mb-3'>
                <label 
                  htmlFor="name" 
                  className='form-label fs-3'
                >
                  Название статьи:
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
            onClick={defaultValue ? HandleUpateStdPub : HandleAddStdPub} 
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
