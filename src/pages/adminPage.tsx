import { NavBar } from "../components/NavBar";
import { AdminPanel } from "../components/AdminPanel";
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

export const AdminPage = () => {

  const classes = useStyles();

  return (<div className={classes.root}>
    <NavBar />
    <AdminPanel />
  </div>)
}