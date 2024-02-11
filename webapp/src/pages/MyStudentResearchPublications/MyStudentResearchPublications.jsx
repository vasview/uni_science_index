import React, { useState, useEffect } from 'react'
import { Grid, Container  } from '@mui/material';
import { isFulfilled } from '@reduxjs/toolkit';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { Loading } from '../../components/UI/Loading';
import { useGetStudentResearchPubsQuery } from '../../features/studentResearchPubs/studentPubApiSlice';
import { useDeleteStudentResearchPubMutation } from '../../features/studentResearchPubs/studentPubApiSlice';
import { useLazyGetStudentResearchWorkListQuery } from '../../features/studentWorks/studentWorkApiSlice';
import { StudentResearchPubTable } from '../../components/UI/StudentResearchPublications/StudentResearchPubTable';
import StudentResearchPubModal from '../../components/UI/StudentResearchPublications/StudentResearchPubModal';

const MyStudentResearchPublications = () => {
  const { data: stdPubs, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: stdPubsError 
  } = useGetStudentResearchPubsQuery();

  const [studentWorkOptions, setStudentWorkOptions] =  useState([""]);

  const [getStudentWorks] = useLazyGetStudentResearchWorkListQuery();

  const getStudentWorkList = async () => {
    const StudenWorkList = await getStudentWorks({}).unwrap();

    return StudenWorkList.map((item) => ({
      value: item.id,
      label: item.topic
    }))
  };

  useEffect(() => {
    const studentWorks = getStudentWorkList();
    studentWorks.then((res) => {setStudentWorkOptions(res)})
  }, [isFulfilled]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [stdPubToEdit, setStdPubToEdit] = useState(null);

  const handleStdPubEdit = (idx) => {
    setStdPubToEdit(idx);

    setOpenModal(true);
  }

  const [deleteStdPub, { isError: delStdPubError }] = useDeleteStudentResearchPubMutation();

  const handleDelStdPub = async(e, value) => {
    e.preventDefault();

    const delStdPub = await deleteStdPub(e.currentTarget.value).unwrap()
    console.log('delStdPub error', delStdPubError);
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
              Публикации по итогам НИРС:
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
          <StudentResearchPubTable 
            stdPubs={stdPubs} 
            delPub={handleDelStdPub} 
            editPub={handleStdPubEdit}
          />
          { openModal && 
            <StudentResearchPubModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setStdPubToEdit(null);
              }}
              defaultValue={stdPubToEdit !== null && stdPubs[stdPubToEdit]}
              studentWorkOptions={studentWorkOptions}
            />
          }
      </Container>
    </>
  )
}

export default MyStudentResearchPublications