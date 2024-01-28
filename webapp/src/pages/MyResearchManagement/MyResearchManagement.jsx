import React, { useState } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetStudentWorksQuery } from '../../features/studentWorks/studentWorkApiSlice';
import { useDeleteStudentWorkMutation } from '../../features/studentWorks/studentWorkApiSlice';
import { StudentSupervisionTable } from '../../components/UI/StudentSupervisions/StudentSupervisionTable';
import StudentSupervisionModal from '../../components/UI/StudentSupervisions/StudentSupervisionModal';


const MyResearchManagement = () => {

  const { data: stdWorks, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: stdWorksError 
  } = useGetStudentWorksQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [stdWorkToEdit, setStdWorkToEdit] = useState(null);

  const handleStdWorkEdit = (idx) => {
    setStdWorkToEdit(idx);

    setOpenModal(true);
  }

  const [deleteStdWork, { isError: delStdWorkError }] = useDeleteStudentWorkMutation();

  const handleDelStdWork = async(e, value) => {
    e.preventDefault();

    const delStdWork = await deleteStdWork(e.currentTarget.value).unwrap()
    console.log('delStdWork error', delStdWorkError);
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
              Руководство НИРС:
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
          <StudentSupervisionTable 
            stdWorks={stdWorks} 
            delWork={handleDelStdWork} 
            editWork={handleStdWorkEdit}
          />
          { openModal && 
            <StudentSupervisionModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setStdWorkToEdit(null);
              }}
              defaultValue={stdWorkToEdit !== null && stdWorks[stdWorkToEdit]}
            />
          }
      </Container>
    </>
  )
}
export default MyResearchManagement