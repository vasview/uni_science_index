import React, { useState } from 'react';
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetInventionPatentsQuery } from '../../features/inventionPatents/inventionPatentApiSlice';
import { useDeleteInventionPatentMutation } from '../../features/inventionPatents/inventionPatentApiSlice';
import { InventionPatentTable } from '../../components/UI/InventionPatents/InventionPatentTable';
import InventionPatentModal from '../../components/UI/InventionPatents/InventionPatentModal';

const MyPatents = () => {
  const { data: patents, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: inventionPatentError 
  } = useGetInventionPatentsQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [patentToEdit, setPatentToEdit] = useState(null);

  const handlePatentEdit = (idx) => {
    setPatentToEdit(idx);

    setOpenModal(true);
  }

  const [deletePatent, { isError: delPatentError }] = useDeleteInventionPatentMutation();

  const handleDelPatent = async(e, value) => {
    e.preventDefault();

    const delPatent = await deletePatent(e.currentTarget.value).unwrap()
    console.log('del patent error', delPatentError);
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
              Патенты на изобретения
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
          <InventionPatentTable 
            patents={patents} 
            delPatent={handleDelPatent} 
            editPatent={handlePatentEdit}
          />

          { openModal && 
            <InventionPatentModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setPatentToEdit(null);
              }}
              defaultValue={patentToEdit !== null && patents[patentToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyPatents