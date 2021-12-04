import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { makeStyles } from '@mui/styles';
import { useData } from "../hooks/useData";
import { viewCurrentUser } from "../services/user";
import { UserData } from "../types/user";
import { changeProfileDescription } from "../services/user";
import { formatDate } from "../utils";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    cardRoot: {
      paddingTop: "100px",
      width: '80vh'
    }
  }))
  
const DisplayUserEntity = (p: { user: UserData, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {
    const classes = useStyles();
    const [openDialog, setDialog] = useState(false);
    const [description, setDescription] = useState('');
    const handleSubscribe = () => {
      changeProfileDescription(description).then(res => {
        setDialog(false);
        window.location.reload();
      })
      .catch((e => {
        console.error(e);
      }))
    }
    
    return (
        <Card className={classes.cardRoot}>
            <CardContent>
              <Typography>User ID: {p.user.id}</Typography>
              <Typography>Username: {p.user.username}</Typography>
              <Typography>Role: {p.user.role}</Typography>
              <Typography>Description: {p.user.profile_description ? p.user.profile_description : "No description"}</Typography>
              <Typography>Signup date: {formatDate(p.user.signup_date)}</Typography>
              <Button onClick={() => {setDialog(!openDialog)}}>Add profile description</Button>
              { openDialog ? 
                <Dialog open={openDialog} onClose={() => {setDialog(false)}}>
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value)}}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => {setDialog(false)}}>Cancel</Button>
                    <Button onClick={handleSubscribe}>Submit</Button>
                  </DialogActions>
                </Dialog> : null     
              }
            </CardContent>
        </Card >
    );
}

export const AccountInfo = () => {
    const [reload, setReload] = useState(false);
    const { data, isLoading } = useData(viewCurrentUser ,[reload]);

    const classes = useStyles();
  
    useEffect(() =>{
      setReload(!reload);
    },[])
  
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
    <AccountInfo/>
  </div>)
}