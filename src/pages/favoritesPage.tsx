import { NavBar } from "../components/NavBar";
import { FavoritesList } from "../components/FavoritesList";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}))

export const FavoritesPage = () => {

  const classes = useStyles();

  return (<div className={classes.root}>
    <NavBar />
    <FavoritesList />
  </div>)
}