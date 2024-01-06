import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select'
import { useDispatch } from 'react-redux';
import { Container, Grid } from '@mui/material';
import PlaylistAddSharpIcon from '@mui/icons-material/PlaylistAddSharp';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Loading } from '../../components/UI/Loading';
import { useGetSciProfilesQuery, useAddSciProfileMutation } from '../../features/auth/userApiSlice';
import { useLazyGetResearchDatabaseQuery } from '../../features/registers/registerApiSlice';
import { isFulfilled } from '@reduxjs/toolkit';
import { SciProfileList } from '../../components/UI/SciProfileList';

const ScientificProfile = () => {
  const dispatch = useDispatch();

  const selectInputRef = useRef(null);

  const [dbName, setDbName] = useState();
  const [account, setAccount] = useState('');
  const [researchDBOptions, setResearchDBOptions] =  useState([""]);

  const [getRDBresearchDB] = useLazyGetResearchDatabaseQuery();

  const getReseachDBList = async () => {
    const researchDBList = await getRDBresearchDB({}).unwrap();

    // const arr = []
    // researchDBList.map((item) => (
    //   arr.push({ value: item.id, label: item.name})
    // ))
    // return arr;
    return researchDBList.map((item) => ({
      value: item.id,
      label: item.name
    }))
  };

  useEffect(() => {
    const rDBs = getReseachDBList();
    rDBs.then((res) => {setResearchDBOptions(res)})
  }, [isFulfilled]);

  const { data: sciProfiles, 
    isLoading, 
    isFetching,
    isSuccess, 
    isError,
    error: sciProfileError 
  } = useGetSciProfilesQuery();

  const [ NewSciProile,
    { isError: NewSciProfileError }
   ] = useAddSciProfileMutation();

  if (isLoading || isFetching) {
    return ( 
      <div className='container pt-5 col-md-3'>
        <Loading />
      </div> 
    )
  }

  const handleSelectOption = (event) => {
    setDbName(event?.value);
  }

  const handleAddNewSciProfile = async (event) => {
    event.preventDefault();

    const sci_profile = {
      research_db: dbName, 
      account: account
    }
    const newUserProfile = await NewSciProile(sci_profile).unwrap()
    // console.log('newUserProfile', newUserProfile)
    setDbName('');
    setAccount('');
    // alert("Form Submitted");
  }

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Typography
        variant='h4'
        sx={{ mb: 3, textAlign: 'center' }}
      >
        Профили в наукометрических базах данных:
      </Typography>
      <form onSubmit={handleAddNewSciProfile}> 
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          justifyContent="center" 
          alignItems="center" 
          marginBottom="1.5rem"
        >
          <Grid item xs={3}>
          <Select
            ref={selectInputRef}
            onChange={handleSelectOption}
            placeholder= "Выберите базу" 
            className='fs-4'
            options={researchDBOptions} 
            isClearable={true}
          />
          </Grid>
          <Grid item xs={4}> 
            <input 
                className='form-control fs-4'
                type="text"
                id='login'
                placeholder='Акаунт'
                // ref={emailRef}
                name='login'
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant='contained'
              size='small'
              type='submit'
              color='success'
              startIcon={<PlaylistAddSharpIcon />}
              sx={{ 
                fontSize: 14,
                flexGrow: 1
              }}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </form>
      <SciProfileList sciProfiles={sciProfiles} />
    </Container>
  )
}

export default ScientificProfile
