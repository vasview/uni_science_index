import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GScholarPublication from './GScholarPublication';

function GScholarPublicationsList(props) {
  const { publications } = props;

  return (
    <>
    <Grid 
      container 
              spacing={{ xs: 2, md: 3 }} 
              justifyContent="center" 
              alignItems="center" 
              marginBottom="1rem"
      >
        <Grid item xs={5}> 
          <Typography
            variant='h5'
            sx={{ textAlign: 'left' }}
          >
           Название публикации:
          </Typography>
        </Grid>
        <Grid item xs={2}> 
          <Typography
            variant='h5'
            sx={{ textAlign: 'left' }}
          >
          Авторы:
          </Typography>
        </Grid>
        <Grid item xs={3}> 
          <Typography
            variant='h5'
            sx={{ textAlign: 'left' }}
          >
          Место публикации:
          </Typography>
        </Grid>
        <Grid item xs={1}> 
          <Typography
            variant='h5'
            sx={{ textAlign: 'left' }}
          >
          Год:
          </Typography>
        </Grid>
        <Grid item xs={1}> 
          <Typography
            variant='h5'
            sx={{ textAlign: 'left' }}
          >
          Цитир.:
          </Typography>
        </Grid>
      </Grid>
        { publications.length > 0 
        ? publications.map((pub) => (
          (<GScholarPublication key={pub.id} pub={pub} />) 
          ))
        : null
      }
    </>  
  )
}

export default GScholarPublicationsList