import { AppBar,Button, Fade, IconButton, InputBase, Link, Menu, Toolbar, Tooltip } from '@mui/material'
import React, { KeyboardEventHandler, useContext, useState } from 'react'
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Typography, MenuItem } from '@mui/material';
import { urls, useRouting } from '../routing';
import { headers } from '../services/config';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../contexts/search';
import { signOut } from '../services/auth';

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
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export const NavBar = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // @ts-ignore
  const classes = useStyles();

  const { routeTo } = useRouting();
  const [,setSearchWord] = useContext(SearchContext);
  const [searchText, setSearchText] = useState<string>("");

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

  const handleKeyPress = (e: any) => {
    if(e.keyCode === 13){
      routeTo(urls.contentPage);
      setSearchWord(searchText);
    }
  }


  return <AppBar position="fixed">
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
      <IconButton edge="start" onClick={() => routeTo(urls.addContent)}>
        <MenuBookIcon className={classes.menuLogo}>
        </MenuBookIcon>
        <Typography variant="h6" className={classes.title}>
          Add Creation page
        </Typography>
      </IconButton>
      <Button> Click me</Button>
      <div style={{ flexGrow: 1 }}>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onKeyUp={handleKeyPress}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={ (e: { target: { value: React.SetStateAction<string>; }; }) => setSearchText(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <Tooltip title="My Profile" style={{ color: 'white' }}>
        <IconButton onClick={handleClick} aria-controls="profile-dropwdown" edge="end">
          <AccountCircleIcon className={classes.menuButton}>
          </AccountCircleIcon>
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