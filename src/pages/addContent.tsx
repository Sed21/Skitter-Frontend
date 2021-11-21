import React, {useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ScrollList } from "../components/ScrollList";
import { makeStyles } from '@mui/styles';
import { Content } from "../types/content";
import { useRouting } from "../routing";
import { SearchContext } from "../contexts/search";
import { useData } from "../hooks/useData";
import Review from "../components/Review";
import { Formik } from "formik";
import {Button, Card, CardContent, TextField } from "@mui/material";
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
  },

  cardRoot: {
    padding: "10vh",
    width: '80vh',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
  },

  formRoot: {
    display: "flex",
    justifyContent: "center"
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
    if(files && files.length === 1) {
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

    console.log(Buffer.from(await file?.arrayBuffer() || ''))
    fetch('http://localhost:8080/api/content/upload', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        book_title: bookTitle,
        book_author: bookAuthor,
        description: description,
        file_bytes: Buffer.from(await file?.arrayBuffer() || '')
      })
      // body: formData
    }).then((res) => res.json().then(r => console.log(r)))
      .catch((e) => {
          console.error(e)
        }
        // console.log(FormData)
        // uploadContent(formData)
        //   .then(() => {'yesss'})
        //   .catch(
        //   (e) => console.log(e)
      )

  }

  return (
    <div>
      <Card className={classes.cardRoot}>
        <CardContent className={classes.formRoot}>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span">
                  Upload
                </Button>
              </label>
            </div>
            <Button type={'submit'}>Send</Button>
          </form>
        </CardContent>
      </Card>
  </div>
  );
}


export const AddContent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <NavBar />
    <AddContentForm/>

  </div>)
}