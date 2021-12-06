import { Button, Card, CardActionArea, CardActions, CardContent, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react'
import { useData } from '../hooks/useData';
import { urls, useRouting } from '../routing';
import { viewFavorites, removeFromFavorites } from '../services/favorites';
import { Favorites } from '../types/favorites';

const useStyles = makeStyles((theme: any) => ({
  scrollRoot: {
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  paper: {
    paddingLeft: "15%",
    paddingRight: "15%",
    paddingTop: '10px',
    marginTop: '10vh',
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',
    maxHeight: '100vh',
  },
  cardRoot: {
    width: "250px",
    height: "200px",
    maxHeight: "300px",
}
}));


const FavoritesBlock = (p: { favorite: Favorites, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

  const { routeTo } = useRouting();
  // @ts-ignore
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea sx={{position: "relative"}} onClick={() => routeTo(urls.contentEntityPage, { id: p.favorite.content_id })}>
        <CardContent sx={{width: "100%"}}>
          <Typography variant="h4" >{p.favorite.book_title}</Typography>
          <Typography>By {p.favorite.book_author}</Typography>
          <Typography>Narrator: {p.favorite.creator_name}</Typography>
          <Typography>Rating: {p.favorite.review}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => { removeFromFavorites(p.favorite.content_id); window.location.reload(); }}>Remove from favorites</Button>
      </CardActions>
    </Card >
  )
}

export const FavoritesList = () => {

  const [reload, setReload] = useState(false);
  const { data, isLoading } = useData(viewFavorites, [reload]);
  const classes = useStyles();

  if (isLoading) {
    return <div></div>;
  }

  return <div className={classes.scrollRoot}>
    <div className={classes.paper}>
      {
        data?.found !== 0 ?
          <Grid container spacing={0}>
            {
              (data?.favorites.map((favorite: Favorites) => <div key={favorite.content_id} style={{ padding: "20px" }}>
                <FavoritesBlock favorite={favorite} setReload={setReload} reload={reload} />
              </div>))
            }
          </Grid>
          : <div>
            <Card sx={{
              display: 'flex',
              height: "40px",
              width: '30vw',
              marginTop: '20px',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
              <Typography variant='h5'>No recordings found in favorites.</Typography>
            </Card>
          </div>
      }
    </div>
  </div>
}