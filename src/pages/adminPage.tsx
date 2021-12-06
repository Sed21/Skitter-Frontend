import { NavBar } from "../components/NavBar";
import { AdminPanel } from "../components/AdminPanel";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vh"
  },
}))

export const AdminPage = () => {

  const classes = useStyles();

  return (<div className={classes.root}>
    <NavBar />
    <AdminPanel />
  </div>)
}