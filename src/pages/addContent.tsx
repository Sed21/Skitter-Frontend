import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { makeStyles } from '@mui/styles';
import { useRouting } from "../routing";
import { useData } from "../hooks/useData";
import Review from "../components/Review";
import { Formik } from "formik";
import { Button, Card, CardContent, Paper, TextField, Typography } from "@mui/material";
import { uploadContent } from "../services/content";

interface AddContent {
  bookTitle: string,
  bookAuthor: string,
  description: string
}

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

  formRoot: {
    display: "flex",
    flexDirection: 'column',
    width: "500px",
    padding: "40px",
    gap: "20px"
  }
}))

export const AddContentForm = () => {
  const classes = useStyles();
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length === 1) {
      setFile(files.item(0) as File)
    }
  }

  const handleSubmit = async () => {
    // const formData = new FormData();
    // formData.append('book_title', bookTitle);
    // formData.append('book_author', bookAuthor);
    // formData.append('description', description);
    // if(file) {
    //   formData.append('file', file);
    // }

    // console.log(Buffer.from(await file?.arrayBuffer() || ''))
    // fetch('http://localhost:8080/api/content/upload', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: localStorage.getItem('token') || '',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     book_title: bookTitle,
    //     book_author: bookAuthor,
    //     description: description,
    //     file_bytes: Buffer.from(await file?.arrayBuffer() || '')
    //   })
    //   // body: formData
    // }).then((res) => res.json().then(r => console.log(r)))
    //   .catch((e) => {
    //     console.error(e)
    //   }
    //     // console.log(FormData)
    //     // uploadContent(formData)
    //     //   .then(() => {'yesss'})
    //     //   .catch(
    //     //   (e) => console.log(e)
    //   )
    console.log(file);
    
  }

  return (
    <div>
      <Paper>
        <form onSubmit={handleSubmit} className={classes.formRoot}>
          <Typography variant="h3" style={{ textAlign: 'center' }}>Upload audiobook</Typography>
          <TextField
            label={"Book Title"}
            value={bookTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookTitle(e.target.value)}
          />
          <TextField
            label={"Book Author"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBookAuthor(e.target.value)}
          />
          <TextField
            label={"Description"}
            multiline
            minRows={3}
            maxRows={5}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          ></TextField>
          <div>
            <input
              accept="audio/mpeg"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file" style={{ display: "flex", alignItems: "center"}}>
              <Button variant="outlined" component="span" >
                Upload
              </Button>
              {file ?<Typography sx={{fontSize: 14, paddingLeft: "10px"}}>{file.name}</Typography>: null}
            </label>
          </div>
          <Button variant="contained" type={'submit'}>Send</Button>
        </form>
      </Paper>
    </div>
  );
}


export const AddContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <AddContentForm />
    </div>)
}