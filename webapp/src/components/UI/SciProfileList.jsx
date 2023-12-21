import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import SciProfileItem from './SciProfileItem';

export const SciProfileList = (props) => {
  const { sciProfiles } = props; 

  return (
    <>
      <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          justifyContent="center" 
          alignItems="center" 
          marginBottom="1rem"
        >
          <Grid item xs={4}> 
            <Typography
              variant='h5'
              sx={{ textAlign: 'left' }}
            >
             Наукометрическая база данных:
            </Typography>
          </Grid>
          <Grid item xs={3}> 
            <Typography
              variant='h5'
              sx={{ textAlign: 'left' }}
            >
             Аккаунт:
            </Typography>
          </Grid>
          <Grid item xs={5}> 
            <Typography
              variant='h5'
              sx={{ textAlign: 'left' }}
            >
            Действия:
            </Typography>
          </Grid>
      </Grid>
        { sciProfiles.length > 0 
          ? sciProfiles.map((item) => (
            (<SciProfileItem key={item.id} item={item} />) 
            ))
          : null
        }
    </>
  )
};
