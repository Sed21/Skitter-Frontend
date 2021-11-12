import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Icon, IconButton } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/search';
import { useData } from '../hooks/useData';
import { Content } from '../types/content';
import { urls, useRouting } from '../routing';
import { getAllAudioBooks, getAudioBooksByCreatorId, getAudioBooksByTitle, getAudioBooksByAuthor } from '../services/content';

const useStyles = makeStyles((theme: any) => ({
  scrollRoot: {
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
    position: 'relative'
  },
  paper: {
    paddingTop: '100px',
    marginTop: '10px',
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    maxHeight: '100vh',
  },
  cardRoot: {
    width: "15vw"
  }
}));


const DisplayContent = (p: { content: Content, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

  const { routeTo } = useRouting();
  // @ts-ignore
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.cardRoot}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://picsum.photos/200/200"
          />
          <CardContent>
            <Typography variant="h4" >{p.content.book_title}</Typography>
            <Typography style={{ textAlign: "end" }}>{p.content.book_title}</Typography>
            <Typography style={{ textAlign: "start" }}>{p.content.book_author}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => routeTo(urls.contentEntityPage, { id: p.content.content_id })}>
            More Details
          </Button>

        </CardActions>
      </Card >
    </Grid>
  );
}

export const ScrollList = () => {

  const [reload, setReload] = useState(false);
  const [searchWord,] = useContext(SearchContext);
  const { data, isLoading } = useData((searchWord ? getAudioBooksByTitle : getAllAudioBooks), [reload], (searchWord ? searchWord : undefined));
  // @ts-ignore
  const classes = useStyles();

  useEffect(() =>{
    setReload(!reload);
  },[searchWord])

  if (isLoading) {
    return <div></div>;
  }
  return <div className={classes.scrollRoot}>
    <div className={classes.paper}>
      <Grid container spacing={3}>
        {data?.content.map((content) => <div key={content.content_id} style={{ padding: "20px" }}>
            <DisplayContent content={content} setReload={setReload} reload={reload} />
          </div>
        )}
      </Grid>
    </div>
  </div>
}