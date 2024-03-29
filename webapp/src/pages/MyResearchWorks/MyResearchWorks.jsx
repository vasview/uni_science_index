import React, { useState, useEffect } from 'react'
import { Grid, Container  } from '@mui/material';
import Typography from '@mui/material/Typography';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import { isFulfilled } from '@reduxjs/toolkit';
import { Loading } from '../../components/UI/Loading';
import { useGetResearchProjectsQuery } from '../../features/researchProjects/researchProjectApiSlice';
import { useDeleteResearchProjectMutation } from '../../features/researchProjects/researchProjectApiSlice';
import { useLazyGetFundSourcesQuery } from '../../features/registers/registerApiSlice';
import { ResearchProjectTable } from '../../components/UI/ResearchProjects/ResearchProjectTable';
import ResearchProjectModal from '../../components/UI/ResearchProjects/ResearchProjectModal';


const MyResearchWorks = () => {

  const { data: projects, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError: projectsError 
  } = useGetResearchProjectsQuery();

  const [fundSources, setFundSources] = useState([]);

  const [getFundSources] = useLazyGetFundSourcesQuery();

  const getFundSourceList = async () => {
    const fundSourceList = await getFundSources({}).unwrap();

    return fundSourceList.map((item) => ({
      value: item.id,
      label: item.name
    }))
  };

  useEffect(() => {
    const Funds = getFundSourceList();
    Funds.then((res) => {setFundSources(res)})
  }, [isFulfilled]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [projectToEdit, setProjectToEdit] = useState(null);

  const handleProjectEdit = (idx) => {
    setProjectToEdit(idx);

    setOpenModal(true);
  }

  const [deleteProject, { isError: delProjectError }] = useDeleteResearchProjectMutation();

  const handleDelProject = async(e, value) => {
    e.preventDefault();

    const delProject = await deleteProject(e.currentTarget.value).unwrap()
    console.log('delProjectError error', delProjectError);
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
              Научно-исследовательская работа:
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
          <ResearchProjectTable 
            projects={projects} 
            delProject={handleDelProject} 
            editProject={handleProjectEdit}
          />
          { openModal && 
            <ResearchProjectModal openModal={openModal}
              closeModal={() => {
                setOpenModal(false);
                setProjectToEdit(null);
              }}
              defaultValue={projectToEdit !== null && projects[projectToEdit]}
              fundSources={fundSources}
            />
          }
      </Container>
    </>
  )
}

export default MyResearchWorks
