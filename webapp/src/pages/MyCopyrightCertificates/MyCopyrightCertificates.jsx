import React from 'react';
import { useState } from 'react';
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetCopyrightCertsQuery } from '../../features/copyrightCertifications/copyrightCertApiSlice';
import { useDeleteCopyrightCertMutation } from '../../features/copyrightCertifications/copyrightCertApiSlice';
import { CopyrightCertificateTable } from '../../components/UI/CopyrightCertificate/CopyrightCertificateTable';
import CopyrightCertModal from '../../components/UI/CopyrightCertificate/CopyrightCertModal';


const MyCopyrightCertificates = () => {

  const { data: certificates, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: certsError 
  } = useGetCopyrightCertsQuery();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [certToEdit, setCertToEdit] = useState(null);

  const handleCertEdit = (idx) => {
    setCertToEdit(idx);

    setOpenModal(true);
  }

  const [deleteCopyrightCert, { isError: deleteCertError }] = useDeleteCopyrightCertMutation();

  const handleDeleteCert = async(e, value) => {
    e.preventDefault();

    const delCertificate = await deleteCopyrightCert(e.currentTarget.value).unwrap()
    console.log('delCertificate error', deleteCertError);
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
              Авторские свидетельства
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
          <CopyrightCertificateTable 
            certificates={certificates} 
            delCertificate={handleDeleteCert} 
            editCertificate={handleCertEdit}
          />
          { openModal && 
            <CopyrightCertModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setCertToEdit(null);
              }}
              defaultValue={certToEdit !== null && certificates[certToEdit]}
            />
          }
      </Container>
    </>
  )
}

export default MyCopyrightCertificates