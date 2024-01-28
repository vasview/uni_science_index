import React, { useState } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetMonographsQuery } from '../../features/monographs/monographApiSlice';
import { useDeleteMonographMutation } from '../../features/monographs/monographApiSlice';
import { MonographTable } from '../../components/UI/Monographs/MonographTable';
import MonographModal from '../../components/UI/Monographs/MonographModal';

const MyMonographPublications = () => {
  const { data: monographs, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: monographError 
  } = useGetMonographsQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [monographToEdit, setMonographToEdit] = useState(null);

  const handleMonographlEdit = (idx) => {
    setMonographToEdit(idx);

    setOpenModal(true);
  }

  const [deleteMonograph, { isError: delMonographError }] = useDeleteMonographMutation();

  const handleDelMonograph = async(e, value) => {
    e.preventDefault();

    const deletedMonograph = await deleteMonograph(e.currentTarget.value).unwrap()
    console.log('del monograph error', delMonographError);
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
              Публикации монографии
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
          <MonographTable 
            monographs={monographs} 
            delMonograph={handleDelMonograph} 
            editMonograph={handleMonographlEdit}
          />

          { openModal && 
            <MonographModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setMonographToEdit(null);
              }}
              defaultValue={monographToEdit !== null && monographs[monographToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyMonographPublications