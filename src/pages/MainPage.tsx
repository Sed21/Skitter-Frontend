import * as React from "react";

export const MainPage: React.FC = () => {
  return (
    <div>{localStorage.getItem('role')}</div>
  )
}