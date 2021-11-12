import { Link, Typography } from "@mui/material";

export function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          Skitter
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }