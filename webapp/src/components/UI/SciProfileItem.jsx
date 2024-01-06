import React from 'react';
import { Grid, IconButton, Tooltip } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined';
import { useDeleteSciProfileMutation } from '../../features/auth/userApiSlice';
import { useLazyGetUserPubsBySciProfileQuery } from '../../features/publications/publicationApiSlice';

function SciProfileItem(props) {
  const { item } = props

  const [ GetUserPubsBySciProfile, { isError: authPubsError } ] = useLazyGetUserPubsBySciProfileQuery();

  const [ DeleteSciProile, { isError }] = useDeleteSciProfileMutation();

  const handleDeleteSciProfile = async(e, value) => {
    e.preventDefault();

    const delSciProfile = await DeleteSciProile(e.currentTarget.value)
    console.log('delete_error', isError);
  }

  const handleGetAuthorPubsByProfile = async(e, value) => {
    e.preventDefault();
    console.log('sci_prfile_id', e.currentTarget.value)

    const getAuthorPubs = await GetUserPubsBySciProfile(e.currentTarget.value)
    console.log('getAuthPubs_error', authPubsError);
  }

  return (
    <Grid 
      container 
      spacing={{ xs: 2, md: 3 }} 
      justifyContent="center" 
      alignItems="center" 
    >
      <Grid item xs={4} textAlign='left' fontSize='14px'> 
        {item.research_db_name}
      </Grid>
      <Grid item xs={3} textAlign='left' fontSize='14px'> 
        {item.account}
      </Grid>
      <Grid item xs={5}> 
      <Tooltip title={<h5>Запросить данные</h5>}>
          <IconButton 
            edge='end' 
            color='info' 
            aria-label='get_data'
            size='large'
            sx={ {
              marginRight: 3
            }}
            value={item.id}
            onClick={handleGetAuthorPubsByProfile}
          >
            <BrowserUpdatedOutlinedIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
        <Tooltip title={<h5>Удалить запись</h5>}>
          <IconButton 
            edge='end' 
            color='error' 
            aria-label='delete_record'
            size='large'
            sx={ {
              marginRight: 3
            }}
            value={item.id}
            onClick={handleDeleteSciProfile}
          >
            <HighlightOffIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
        {/* {item.id} */}
      </Grid>      
    </Grid>
  )
}

export default SciProfileItem