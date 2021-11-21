import { AppBar,
  Button,
  Card, CardActionArea, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import React, {useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ScrollList } from "../components/ScrollList";
import { makeStyles } from '@mui/styles';
import {getAllAudioBooks, getAudioBookData, getAudioBooksByContentId} from '../services/content';
import { Content } from "../types/content";
import { useRouting } from "../routing";
import { SearchContext } from "../contexts/search";
import { useData } from "../hooks/useData";
import ReactAudioPlayer from 'react-audio-player';
import Review from "../components/Review";



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  cardRoot: {
    width: '80vh'
  }
}))

const DisplayContentEntity = (p: { content: Content, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

  const { routeTo } = useRouting();
  // @ts-ignore
  const classes = useStyles();
  const audioFile = window.location.href.split('/').pop() || ''

  return (
      <Card className={classes.cardRoot}>
          <CardContent>
            <Typography variant="h4" >{p.content.book_title}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.book_title}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.book_author}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.creator_name}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.description}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.review}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.upload_date}</Typography>
            <div>
              <ReactAudioPlayer
                src={`http://127.0.0.1:8080/api/content/audio/${encodeURI(audioFile)}`}
                autoPlay={false}
                controls={true}
                // controlsList={"Download"}
              />
            </div>
            <Review content_id={p.content.content_id} reviewValue={p.content.review}/>
          </CardContent>


      </Card >
  );
}

export const ContentBlock = () => {

  const [reload, setReload] = useState(false);
  const [searchWord, setSearchWord] = useContext(SearchContext);
  setSearchWord(window.location.href.split('/')[0] || '');
  const { data, isLoading } = useData(getAudioBooksByContentId, [reload],window.location.href.split('/').pop() || '');
  // @ts-ignore
  const classes = useStyles();

  useEffect(() =>{
    setReload(!reload);
  },[searchWord])

  if (isLoading) {
    return <div></div>;
  }
  return <div>
    <DisplayContentEntity content={data?.content[0] as unknown as Content} setReload={setReload} reload={reload} />
  </div>
}

export const ContentEntityPage = () => {
  const classes = useStyles();
  return (<div className={classes.root}>
    <NavBar />
    <ContentBlock/>
  </div>)
}