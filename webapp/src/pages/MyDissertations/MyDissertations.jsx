import React, { useState } from 'react';
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetThesisDefencesQuery } from '../../features/thesisDefence/thesisDefenceApiSlice';
import { useDeleteThesisDefenceMutation } from '../../features/thesisDefence/thesisDefenceApiSlice';
import { ThesisDefenceTable } from '../../components/UI/ThesisDefences/ThesisDefenceTable';
import ThesisDefenceModal from '../../components/UI/ThesisDefences/ThesisDefenceModal';

const MyDissertations = () => {

  const { data: thesises, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: thesisError 
  } = useGetThesisDefencesQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [thesisToEdit, setThesisToEdit] = useState(null);

  const handleThesisEdit = (idx) => {
    setThesisToEdit(idx);

    setOpenModal(true);
  }

  const [deleteThesis, { isError: delThesisError }] = useDeleteThesisDefenceMutation();

  const handleDelThesis = async(e, value) => {
    e.preventDefault();

    const delThesis = await deleteThesis(e.currentTarget.value).unwrap()
    console.log('del_Thesis error', delThesisError);
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
              Защита диссертации
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
          <ThesisDefenceTable 
            thesises={thesises} 
            delThesis={handleDelThesis} 
            editThesis={handleThesisEdit}
          />
          { openModal && 
            <ThesisDefenceModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setThesisToEdit(null);
              }}
              defaultValue={thesisToEdit !== null && thesises[thesisToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyDissertations