import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Icon, IconButton } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/search';
import { useData } from '../hooks/useData';
import { urls, useRouting } from '../routing';
import { viewFavorites, removeFromFavorites } from '../services/favorites';
import { Favorites } from '../types/favorites';

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


const DisplatFavorites = (p: { favorite: Favorites, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

  const { routeTo } = useRouting();
  // @ts-ignore
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.cardRoot}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h4" >{p.favorite.book_title}</Typography>
            <Typography>{p.favorite.book_title}</Typography>
            <Typography>{p.favorite.book_author}</Typography>
            <Typography>{p.favorite.creator_name}</Typography>
            <Typography>{p.favorite.review}</Typography>
            <Typography>{p.favorite.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => routeTo(urls.contentEntityPage, { id: p.favorite.content_id })}>
            More Details
          </Button>
          <Button onClick={() => removeFromFavorites(p.favorite.content_id)}>Remove from favorites</Button>
        </CardActions>
      </Card >
    </Grid>
  );
}

export const FavoritesList = () => {

  const [reload, setReload] = useState(false);
  const [searchWord,] = useContext(SearchContext);
  const { data, isLoading } = useData(viewFavorites, [reload]);
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
        {data?.favorites.map((favorite: Favorites) => <div key={favorite.content_id} style={{ padding: "20px" }}>
            <DisplatFavorites favorite={favorite} setReload={setReload} reload={reload} />
          </div>
        )}
      </Grid>
    </div>
  </div>
}