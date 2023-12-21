import React from 'react'
import { Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Loading } from '../../components/UI/Loading';
import { useGetGSPublicationsQuery } from '../../features/publications/publicationApiSlice';
import GScholarPublicationsList from '../../components/UI/GScholarPublicationsList';

function MyGScholarPublications() {

  const { data: publications, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError,
    error: publicationsError 
  } = useGetGSPublicationsQuery();

  if (isLoading || isFetching) {
    return ( 
      <div className='container pt-5 col-md-3'>
        <Loading />
      </div> 
    )
  }

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Typography
        variant='h4'
        sx={{ mb: 3, textAlign: 'center' }}
      >
        Публикации на сайте Google Scholar:
      </Typography>
      <GScholarPublicationsList publications={publications}/>
    </Container>
  )
}

export default MyGScholarPublications