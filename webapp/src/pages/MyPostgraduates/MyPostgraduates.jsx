import React, { useState } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetDoctoralWorksQuery } from '../../features/DoctoralWorks/doctoralWorkApiSlice';
import { useDeleteDoctoralWorkMutation } from '../../features/DoctoralWorks/doctoralWorkApiSlice';
import { DoctoralSupervisionTable } from '../../components/UI/DoctoralSupervisions/DoctoralSupervisionTable';
import DoctoralSupervisionModal from '../../components/UI/DoctoralSupervisions/DoctoralSupervisionModal';


const MyPostgraduates = () => {

  const { data: docWorks, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: docWorksError 
  } = useGetDoctoralWorksQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [docWorkToEdit, setDocWorkToEdit] = useState(null);

  const handleDocWorkEdit = (idx) => {
    setDocWorkToEdit(idx);

    setOpenModal(true);
  }

  const [deleteDocWork, { isError: delDocWorkError }] = useDeleteDoctoralWorkMutation();

  const handleDelDocWork = async(e, value) => {
    e.preventDefault();

    const delDocWork = await deleteDocWork(e.currentTarget.value).unwrap()
    console.log('delDocWork error', delDocWorkError);
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
              Руководство аспирантами/докторантами:
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
          <DoctoralSupervisionTable 
            docWorks={docWorks} 
            delWork={handleDelDocWork} 
            editWork={handleDocWorkEdit}
          />
          { openModal && 
            <DoctoralSupervisionModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setDocWorkToEdit(null);
              }}
              defaultValue={docWorkToEdit !== null && docWorks[docWorkToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyPostgraduates