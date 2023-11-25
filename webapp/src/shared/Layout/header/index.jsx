import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Tooltip,
         Stack, Button, Grid, Container, Menu, MenuItem } from "@mui/material";
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import './navbar.css'
import Logo from './logo';

function Header() {
  // handle clicks
  // const navigate = useNavigate();
  // const handleRoutes = (path) =>{
  //   navigate(path)
  // }
  // lecture submenu
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleLectureBtnClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLecturesClose = () => {
    setAnchorEl(null)
  }
  // Nir submenu
  const [nirAnchorEl, setNirAnchorEl] = useState(null)
  const nirOpen = Boolean(nirAnchorEl)
  const handleNirBtnClick = (event) => {
    setNirAnchorEl(event.currentTarget)
  }

  const handleNirClose = () => {
    setNirAnchorEl(null)
  }
  // Publication submenu
  const [pubAnchorEl, setPubAnchorEl] = useState(null)
  const pubOpen = Boolean(pubAnchorEl)
  const handlePublicationBtnClick = (event) => {
    setPubAnchorEl(event.currentTarget)
  }

  const handlePublicationClose = () => {
    setPubAnchorEl(null)
  }
  // Profile submenu
  const [profileMenurEl, setProfileMenurEl] = useState(null)
  const profileOpen = Boolean(profileMenurEl)
  const handleProfileBtnClick = (event) => {
    setProfileMenurEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setProfileMenurEl(null)
  }
  // Invention submenu
  const [inventionMenurEl, setinventionMenurEl] = useState(null)
  const inventionOpen = Boolean(inventionMenurEl)
  const handleInventionBtnClick = (event) => {
    setinventionMenurEl(event.currentTarget)
  }

  const handleInventionClose = () => {
    setinventionMenurEl(null)
  }

  const isAthenticated = true; 
  console.log('auth', isAthenticated)
  // let navigate = useNavigate();

  // const navigateHome = () => {
  //   // 👇️ navigate to /
  //   navigate('/');
  // };

  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton edge='start' 
                      color='inherit' 
                      aria-label='logo'
                      href="/">
            <Logo />
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              КГТУ им. И.Раззакова
            </Typography>
          </IconButton>
          <Stack direction='row' spacing={2}>
            <Button 
              color='inherit' 
              size="medium" 
              style={{fontSize: 20, textTransform: 'none'}}
              href='/my_employees'
            >
              Сотрудники
            </Button>
            <Button 
              id='lectures-btn'
              onClick={handleLectureBtnClick}
              aria-control={open ? 'lectures-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              endIcon={<ArrowDownIcon />}
              color='inherit' 
              size="medium" 
              style={{fontSize: 20, textTransform: 'none'}}
            >
              Лекции
            </Button>
            <Button 
              id='nir-btn'
              onClick={handleNirBtnClick}
              aria-control={nirOpen ? 'nir-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={nirOpen ? 'true' : undefined}
              endIcon={<ArrowDownIcon />}
              color='inherit' 
              size="medium" 
              style={{fontSize: 20}}
            >
              НИР
            </Button>
            <Button 
              id='publication-btn'
              onClick={handlePublicationBtnClick}
              aria-control={pubOpen ? 'publication-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={pubOpen ? 'true' : undefined}
              endIcon={<ArrowDownIcon />}
              color='inherit' 
              size="medium" 
              style={{fontSize: 20, textTransform: 'none'}}
            >
              Публикации
            </Button>
            <Button 
              id='invention-btn'
              onClick={handleInventionBtnClick}
              aria-control={inventionOpen ? 'invention-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={inventionOpen ? 'true' : undefined}
              endIcon={<ArrowDownIcon />}
              color='inherit' 
              size="medium" 
              style={{fontSize: 20, textTransform: 'none'}}
            >
              Изобретения
            </Button>
            {/* <Button
              id='profile-btn'
              onClick={handleProfileBtnClick}
              aria-control={profileOpen ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={profileOpen ? 'true' : undefined}
              endIcon={<ArrowDownIcon />}
              color='inherit' 
              size="medium" 
              style={{fontSize: 20, textTransform: 'none'}}
            >
              Мой профиль
            </Button> */}
            {/* my profile */}
            <Tooltip title="Настройки профиля">
              <IconButton
                id='account-btn'
                onClick={handleProfileBtnClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={profileOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={profileOpen ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>

            <IconButton 
              edge='end' 
              color='inherit' 
              aria-label='Exit'
              size='large'
            >
              <LogoutIcon style={{ fontSize: 24 }}/>
            </IconButton>
          </Stack>
          <Menu 
            id='lectures-menu' 
            anchorEl={anchorEl} 
            open={open}
            MenuListProps={{
              'aria-labelledby': 'lectures-btn',
            }}
            onClose={handleLecturesClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_guest_lectures'>
              Гостевые лекции и стажировки
            </MenuItem>
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_conferences'>
              Семинары и конференции
            </MenuItem>
          </Menu>
          {/* Nir submenu */}
          <Menu 
            id='profile-menu' 
            anchorEl={nirAnchorEl} 
            open={nirOpen}
            MenuListProps={{
              'aria-labelledby': 'nir-btn',
            }}
            onClose={handleNirClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem 
              sx={{fontSize: 20}}
              component={'a'}
              href="/my_dissertations"
            > 
              Защита диссертации
            </MenuItem>
            <MenuItem 
              sx={{fontSize: 20}}
              component={'a'}
              href="/my_postgraduates"
            >
              Руководство докторантами и аспирантами
            </MenuItem>
            <MenuItem 
              sx={{fontSize: 20}}
              component={'a'}
              href="/my_resarch_management"
            >
              Руководство НИРС
            </MenuItem>
            <MenuItem 
              sx={{fontSize: 20}}
              component={'a'}
              href="/my_resarch_works"
            >
              Научно-исследовательская работы
            </MenuItem>
            <MenuItem 
              sx={{fontSize: 20}}
              component={'a'}
              href="/my_resarch_summary"
            >
              Сводка по НИР
            </MenuItem>
          </Menu>
          {/* Publication submenu */}
          <Menu 
            id='publication-menu' 
            anchorEl={pubAnchorEl} 
            open={pubOpen}
            MenuListProps={{
              'aria-labelledby': 'publication-btn',
            }}
            onClose={handlePublicationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem 
              sx={{fontSize: 20}} 
              component={'a'} 
              href='/my_research_publications'
            > 
              Публикации по итогам НИРС
            </MenuItem>
            <MenuItem 
              sx={{fontSize: 20}} 
              component={'a'} 
              href='/my_monograph_publications'
            > 
              Публикация монографии
            </MenuItem>
          </Menu>
          {/* Invention submenu */}
          <Menu 
            id='invention-menu' 
            anchorEl={inventionMenurEl} 
            open={inventionOpen}
            MenuListProps={{
              'aria-labelledby': 'invention-btn',
            }}
            onClose={handleInventionClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_copyright_certificates'>
              Получение авторских свидетельств
            </MenuItem>
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_inventions'>
              Заявка на изобретение
            </MenuItem>
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_patents'>
              Патенты на изобретение
            </MenuItem>
          </Menu>
          {/* Profile submenu */}
          <Menu 
            id='account-menu' 
            anchorEl={profileMenurEl} 
            open={profileOpen}
            MenuListProps={{
              'aria-labelledby': 'account-btn',
            }}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          > 
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_sci_profile'>
              Научный профиль
            </MenuItem>
            <MenuItem sx={{fontSize: 20}} component={'a'} href='/my_profile'>
              Настройки профиля
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header