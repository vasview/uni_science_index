import React, { useState } from 'react';
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetGuestLecturesQuery } from '../../features/guestLectures/guestLectureApiSlice';
import { useDeleteGuestLectureMutation } from '../../features/guestLectures/guestLectureApiSlice';
import { GuestLectureTable } from '../../components/UI/GuestLectures/GuestLectureTable';
import GuestLectureModal from '../../components/UI/GuestLectures/GuestLectureModal';

const MyGestLectures = () => {

  const { data: lectures, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: lectureError 
  } = useGetGuestLecturesQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [lectureToEdit, setLectureToEdit] = useState(null);

  const handleLectureEdit = (idx) => {
    setLectureToEdit(idx);

    setOpenModal(true);
  }

  const [deleteLecture, { isError: delLectureError }] = useDeleteGuestLectureMutation();

  const handleDelLecture = async(e, value) => {
    e.preventDefault();

    const delLecture = await deleteLecture(e.currentTarget.value).unwrap()
    console.log('delLecture error', delLectureError);
  }

  if (isLoading || isFetching) {
    return ( 
    <div className='container pt-5 col-md-3'>
      <Loading />
    </div> 
    )
  }

  return (
    <>
      <Container sx={{ paddingTop: 2 }} maxWidth={false}>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
        >
          <Grid item xs={10}>
            <Typography
              variant='h4'
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Гостевые лекции и стажировки
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}>
            <Button
              variant='contained'
              color='success'
              size='small'
              startIcon={<PlaylistAddSharpIcon />}
              onClick={handleOpenModal}
              sx={{ 
                fontSize: 14,
                flexGrow: 1
              }}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
          <GuestLectureTable 
            lectures={lectures} 
            delLecture={handleDelLecture} 
            editLecture={handleLectureEdit}
          />
          { openModal && 
            <GuestLectureModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setLectureToEdit(null);
              }}
              defaultValue={lectureToEdit !== null && lectures[lectureToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyGestLectures