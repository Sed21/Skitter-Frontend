import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Paper, Avatar, List, ListItem, ListItemButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { makeStyles } from '@mui/styles';
import { useData } from "../hooks/useData";
import { deleteUserProfile, viewCurrentUser } from "../services/user";
import { UserData } from "../types/user";
import { changeProfileDescription } from "../services/user";
import { formatDate } from "../utils";
import { blue, deepOrange, deepPurple, lightGreen, red } from '@mui/material/colors';
import { urls, useRouting } from '../routing';
import { headers } from '../services/config';
import { signOut } from '../services/auth';
import { getAudioBooksByCreatorId } from "../services/content";
import { width } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: "20px",
    width: '50vw',
    minheight: "250px",
    display: "flex",
    flexDirection: 'column',
  },
  container2: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "100%"
  }
}))



const DisplayUserEntity = (p: { user: UserData, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {
  const classes = useStyles();
  const [openDialog, setDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [description, setDescription] = useState('');
  const { routeTo } = useRouting();

  const [reload, setReload] = useState(false);
  const { data, isLoading } = useData(getAudioBooksByCreatorId, [reload], localStorage.getItem('id') || '');

  useEffect(() => {
    setReload(!reload);
  }, [])

  const handleSubscribe = () => {
    changeProfileDescription(description).then(res => {
      setDialog(false);
      window.location.reload();
    })
      .catch((e => {
        console.error(e);
      }))
  }

  const handleDelete = () => {
    deleteUserProfile().then(r => {
      signOut()
        .then(() => {
          localStorage.clear();
          headers.Authorization = "";
          routeTo(urls.welcomePage)
        })
        .catch(() => {
          localStorage.clear();
          headers.Authorization = "";
          routeTo(urls.welcomePage)
        });
    })
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Paper className={classes.container}>
      <div className={classes.container2}>
        {
          localStorage.getItem('role') === "Admin" ? <Avatar sx={{ width: 120, height: 120, fontSize: 52, margin: "10px", marginRight: "30px", bgcolor: deepPurple[500] }}>{p.user.username.charAt(0).toUpperCase()}</Avatar> :
            localStorage.getItem('role') === "Creator" ? <Avatar sx={{ width: 120, height: 120, fontSize: 52, margin: "10px", marginRight: "30px", bgcolor: deepOrange[500] }}>{p.user.username.charAt(0).toUpperCase()}</Avatar> :
              <Avatar sx={{ width: 120, height: 120, fontSize: 52, margin: "10px", marginRight: "20px", bgcolor: lightGreen[500] }}>{p.user.username.charAt(0).toUpperCase()}</Avatar>
        }
        <div>
          <Typography>User ID: {p.user.id}</Typography>
          <Typography>Username: {p.user.username}</Typography>
          <Typography>Role: {p.user.role}</Typography>
          <Typography>Description: {p.user.profile_description ? p.user.profile_description : <i>No description</i>}</Typography>
          <Typography>Sign up date: {formatDate(p.user.signup_date)}</Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant={"outlined"} sx={{ marginTop: "20px", bgcolor: blue[200], color: "white", '&:hover': { color: "black" } }} onClick={() => { setDialog(!openDialog) }}>Change profile description</Button>
            <Button variant={"outlined"} sx={{
              marginTop: "20px",
              marginLeft: "10vw",
              bgcolor: red[300],
              color: "white",
              '&:hover': {
                backgroundColor: red[900],
              }
            }} onClick={() => { setDeleteDialog(!openDialog) }}>Delete account</Button>
          </div>
        </div>
      </div>
      <div style={{marginLeft: "10vw"}}>
          {
            localStorage.getItem('role') === "Admin" || localStorage.getItem('role') === "Creator" ?
              (!data || data.found === 0 ? <Typography><i>No audiobooks uploaded :/</i></Typography> :

                <List>
                  <Typography><b>Found {data.found} audiobooks of {p.user.username}: </b></Typography>
                  {data.content.map(e => <div key={e.content_id}>
                    <ListItemButton onClick={() => routeTo(urls.contentEntityPage, { id: e.content_id })}>
                      {e.book_title} by {e.book_author}
                    </ListItemButton>
                  </div>)}
                </List>)
              : null
          }
        </div>

      {openDialog ?
        <Dialog open={openDialog} onClose={() => { setDialog(false) }}>
          <DialogTitle>Description</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Set your unique account description.
            </DialogContentText>
            <TextField
              multiline
              autoFocus
              margin="dense"
              id="description"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setDescription(e.target.value) }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setDialog(false) }}>Cancel</Button>
            <Button onClick={handleSubscribe}>Submit</Button>
          </DialogActions>
        </Dialog> : null
      }

      {openDeleteDialog ?
        <Dialog open={openDeleteDialog} onClose={() => { setDialog(false) }}>
          <DialogTitle><b>Delete</b></DialogTitle>
          <DialogContent>
            <DialogContentText variant={"h6"}>
              Do you want to delete your account ?
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={() => { setDeleteDialog(false) }}>Go back</Button>
            <Button onClick={handleDelete}>Yes, I want to delete it</Button>
          </DialogActions>
        </Dialog> : null
      }

    </Paper >
  );
}

export const AccountInfo = () => {
  const [reload, setReload] = useState(false);
  const { data, isLoading } = useData(viewCurrentUser, [reload]);

  const classes = useStyles();

  useEffect(() => {
    setReload(!reload);
  }, [])

  if (isLoading) {
    return <div></div>;
  }
  return <div>
    <DisplayUserEntity user={data} setReload={setReload} reload={reload} />
  </div>
}

export const AccountPage = () => {
  const classes = useStyles();
  return (<div className={classes.root}>
    <NavBar />
    <AccountInfo />
  </div>)
}