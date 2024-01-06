import React, { useState } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetInventionAplsQuery } from '../../features/inventionApplications/inventionAplApiSlice';
import { useDeleteInventionAplMutation } from '../../features/inventionApplications/inventionAplApiSlice';
import { InventionApplicationTable } from '../../components/UI/InventionApplications/InventionApplicationTable';
import InventionApplicationModal from '../../components/UI/InventionApplications/InventionApplicationModal';

const MyInventions = () => {
  const { data: applications, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: inventionAplError 
  } = useGetInventionAplsQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [aplToEdit, setAplToEdit] = useState(null);

  const handleAplEdit = (idx) => {
    setAplToEdit(idx);

    setOpenModal(true);
  }

  const [deleteAplication, { isError: deleteAplError }] = useDeleteInventionAplMutation();

  const handleDeleteApl = async(e, value) => {
    e.preventDefault();

    const delApl = await deleteAplication(e.currentTarget.value).unwrap()
    console.log('del Application error', deleteAplError);
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
     <Container sx={{ paddingTop: 2 }}>
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
        >
          <Grid item xs={10}>
            <Typography
              variant='h4'
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Заявки на изобретения
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'right' }}>
            <Button
              variant='contained'
              size='small'
              color='success'
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
          <InventionApplicationTable 
            applications={applications} 
            delApplication={handleDeleteApl} 
            editApplication={handleAplEdit}
          />

          { openModal && 
            <InventionApplicationModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setAplToEdit(null);
              }}
              defaultValue={aplToEdit !== null && applications[aplToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyInventions