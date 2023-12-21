import React from 'react';
import Grid from '@mui/material/Grid';

function GScholarPublication(props) {
  const { pub } = props;

  return (
    <Grid 
      container 
      spacing={{ xs: 2, md: 3 }} 
      justifyContent="center" 
      alignItems="center" 
    >
      <Grid item xs={5} textAlign='left' fontSize='14px'> 
        <a href={pub.link} target='_blank'>
          {pub.title}
        </a>
      </Grid>
      <Grid item xs={2} textAlign='left' fontSize='14px'> 
        {pub.authors}
      </Grid>
      <Grid item xs={3}  textAlign='left' fontSize='14px'> 
        {pub.publication}
      </Grid>     
      <Grid item xs={1}  textAlign='left' fontSize='14px'> 
        {pub.year}
      </Grid>   
      <Grid item xs={1}  textAlign='left' fontSize='14px'> 
        {pub.citation_number}
      </Grid>  
    </Grid>
  )
}

export default GScholarPublication