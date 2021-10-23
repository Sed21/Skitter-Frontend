import * as React from "react";
import {Route, Redirect} from "react-router-dom";

interface Props {
  path: string
  role: string
}

export const AuthRoute: React.FC<Props> = (props: Props) => {
  const role = localStorage.getItem('role') || '';
  const isAuthed = !!localStorage.getItem('token')
  if((role in ['Creator', 'Listener', 'Admin']) && isAuthed)  return <Redirect to={'/home'}/>;
  else if (!isAuthed) return <Redirect to={'/'}/>;
  return (
    <Route {...props}/>
  );
}