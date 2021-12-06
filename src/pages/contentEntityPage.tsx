import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { makeStyles } from '@mui/styles';
import { addToFavorites, removeFromFavorites, viewFavorites } from '../services/favorites';
import { getAudioBooksByContentId } from '../services/content';
import { useData } from "../hooks/useData";
import ReactAudioPlayer from 'react-audio-player';
import Review from "../components/Review";
import { apiUrl } from "../services/config";
import { formatDate } from "../utils";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";



const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRoot: {
    display: "flex",
    flexDirection: 'row',
    width: "70vw",
    height: "65vh",
    gap: "20px",
    alignItems: 'center'
  },
  player: {
    width: "80%",
  }
}))

const ContentBlock = () => {
  const contentId = window.location.href.split('/').pop() || ''
  const { data, isLoading } = useData(getAudioBooksByContentId, [], contentId);
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState<Boolean>(false)

  const isInFavorites = async (id: string) => {
    const favorites = await viewFavorites()
    const entity = favorites.favorites.filter((e: any) => e.content_id === id)
    return entity.length !== 0
  }

  if (isLoading) {
    return <div></div>;
  }

  const p = data?.content[0]
  if (!p) return <div />

  isInFavorites(p.content_id)
    .then(res => setIsFavorite(res))
    .catch(e => { })

  return (
    <Card className={classes.cardRoot}>
      <CardMedia sx={{ width: "40%", height: "100%" }}
        component="img"
        image="https://picsum.photos/200/200" />
      <Box sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h4" sx={{ paddingBottom: "10px" }}>{p.book_title}</Typography>
          <Typography>By {p.book_author}</Typography>
          <br />
          <Typography>Narrator: {p.creator_name}</Typography>
          <Typography><b>Description:</b> {p.description}</Typography>
          <br />
          <Review content_id={p.content_id} reviewValue={p.review} />
          <br />
          <Typography>Uploaded on {formatDate(p.upload_date)}.</Typography>
        </CardContent>
        <CardMedia>
          <ReactAudioPlayer className={classes.player}
            src={`${apiUrl}/api/content/audio/${encodeURI(contentId)}`}
            autoPlay={false}
            controls={true} />
        </CardMedia>
        <CardActionArea sx={{ maxWidth: "36%" }}>
          {
            isFavorite ?
              <IconButton sx={{ color: "red" }} onClick={() => {
                setIsFavorite(false);
                removeFromFavorites(p.content_id)
              }}>
                <Typography sx={{ marginRight: "10px" }}>
                  {
                    "Remove from favorites"
                  }
                </Typography>
                <FavoriteIcon />
              </IconButton> : 

            <IconButton sx={{ color: "gray" }} onClick={() => {
              setIsFavorite(true);
              addToFavorites(p.content_id)
            }}>
              <Typography sx={{ marginRight: "10px" }}>
                {
                  "Add to favorites"
                }
              </Typography>
              <FavoriteIcon />
            </IconButton>

          }

        </CardActionArea>
      </Box>

    </Card>
  );
}

export const ContentEntityPage = () => {
  const classes = useStyles();
  return (<div className={classes.root}>
    <NavBar />
    <ContentBlock />
  </div>)
}