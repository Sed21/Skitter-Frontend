import { AppBar, IconButton,  Link, Menu, Toolbar, Tooltip } from '@mui/material'
import React, {  useContext, useState } from 'react'
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography, MenuItem } from '@mui/material';
import { urls, useRouting } from '../routing';
import { headers } from '../services/config';
import { signOut } from '../services/auth';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// @ts-ignore
const useStyles = makeStyles((theme: any) => ({
  menuButton: {
    color: 'white',
    fontSize: 50,
  },
  title: {
    color: 'white'
  },
  menuLogo: {
    color: 'white',
    fontSize: 40,
    marginRight: '5px'
  }
}));


export const NavBar = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // @ts-ignore
  const classes = useStyles();

  const { routeTo } = useRouting();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    signOut()
      .then(() => {
      localStorage.clear();
      headers.Authorization = "";
      routeTo(urls.signInPage)})
      .catch(() => {
        localStorage.clear();
        headers.Authorization = "";
        routeTo(urls.signInPage)
      });
  }


  return <AppBar color="transparent" position="fixed">
    <Toolbar>
      <Link href="/mainpage">
        <IconButton edge="start">
          <MenuBookIcon className={classes.menuLogo}>
          </MenuBookIcon>
          <Typography variant="h6" className={classes.title}>
            Skitter
          </Typography>
        </IconButton>
      </Link>
      <div style={{ flexGrow: 1 }}/>
      { localStorage.getItem("role") === "Admin" || localStorage.getItem("role") === "Creator" ?
        <Link href="/upload" style={{ textDecoration: 'none' }}>
        <IconButton edge="start" sx={{paddingRight: "15px"}}>
          <CloudUploadIcon sx={{marginRight: "5px", color: "white"}}/>
          <Typography variant="h6" className={classes.title}>
            Upload recording
          </Typography>
        </IconButton>
      </Link> : null
      }
      <Tooltip title="My Profile" style={{ color: 'white' }}>
        <IconButton onClick={handleClick} aria-controls="profile-dropwdown" edge="end">
          <AccountCircleIcon className={classes.menuButton}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="profile-dropdown"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => routeTo(() => urls.accountPage({id: localStorage.getItem('id') || ''}))}>
          <Typography>My account</Typography>
        </MenuItem>
        {localStorage.getItem("role") === "Admin" ?
          <MenuItem onClick={() => routeTo(urls.adminPage)}>
            <Typography>Admin Panel</Typography>
          </MenuItem> : null}
        <MenuItem onClick={() => routeTo(urls.favoritesPage)}>
          <Typography>Favorites</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <Typography>Log Out</Typography>
        </MenuItem>
      </Menu>
    </Toolbar>
  </AppBar >
}