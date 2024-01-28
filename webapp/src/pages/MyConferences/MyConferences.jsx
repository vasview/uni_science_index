import React, { useState } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetConferencesQuery } from '../../features/conferences/conferenceApiSlice';
import { useDeleteConferenceMutation } from '../../features/conferences/conferenceApiSlice';
import { ConferenceTable } from '../../components/UI/Conferences/ConferenceTable';
import ConferenceModal from '../../components/UI/Conferences/ConferenceModal';

const MyConferences = () => {

  const { data: conferences, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: conferenceError 
  } = useGetConferencesQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [confToEdit, setConfToEdit] = useState(null);

  const handleConfEdit = (idx) => {
    setConfToEdit(idx);

    setOpenModal(true);
  }

  const [deleteConference, { isError: delConfError }] = useDeleteConferenceMutation();

  const handleDelConference = async(e, value) => {
    e.preventDefault();

    const delCertificate = await deleteConference(e.currentTarget.value).unwrap()
    console.log('delConference error', delConfError);
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
              Семинары и конференции
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
          <ConferenceTable 
            conferences={conferences} 
            delConference={handleDelConference} 
            editConference={handleConfEdit}
          />
          { openModal && 
            <ConferenceModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setConfToEdit(null);
              }}
              defaultValue={confToEdit !== null && conferences[confToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyConferences