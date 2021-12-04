import React, {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getAllAudioBooks } from '../services/content';
import { adminViewUsers } from '../services/admin';
import { useData } from '../hooks/useData';
import { User, UserResponse } from '../types/admin';
import { Content } from '../types/content';
import { ContentResponse } from '../types/content';
import { formatDate } from '../utils';

const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: "200px",
      backgroundColor: 'white',
      width: '100vw',
      height: '70vh'
    },
    dataGrid: {
      width: '80vw'
    }
  }))

export function AdminPanel(){
    const classes = useStyles();

    const [tab, setTab] = useState("Users");
    const [reload, setReload] = useState(false);
    const {data, isLoading} = useData<UserResponse | ContentResponse>(tab === 'Users' ? adminViewUsers : getAllAudioBooks, [reload]);
    const [content, SetContent] = useState<ContentResponse>();


    const userCols = [
      {field: 'idx', headerName: "No", width: 100},
      {field: 'id', headerName: "Id", width: 100},
      {field: 'username', headerName: "Name", width: 100},
      {field: 'role', headerName: "Role", width: 100},
      {field: 'profile_description', headerName: "Description", width: 100},
      {field: 'signup_date', headerName: "Sign Up Date", width: 100},
      {field: 'last_signin', headerName: "Last Sign In",  width: 100}
    ]

    const contentCols = [
      {field: 'idx', headerName: "No",width: 100},
      {field: 'id', headerName: "Id",width: 100},
      {field: 'creator_name', headerName: "Creator Name",width: 100},
      {field: 'book_title', headerName: "Title",width: 100},
      {field: 'book_author', headerName: "Author",width: 100},
      {field: 'review', headerName: "Review",width: 100},
      {field: 'upload_date', headerName: "Date",width: 100},
    ]
    useEffect(() =>{
      setReload(!reload);
    },[])

    if (isLoading) {
        return <div></div>;
    }
    
    const handleChange = () => {
        if(tab == "Users") {
          setTab("Content"); 
          getAllAudioBooks()
          .then((res) => SetContent(res))
          .catch((e) => {});
        } else {
          setTab("Users");
        }
    }

    return (
        <Box className={classes.root}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={tab}
            onChange={handleChange}>
            <ToggleButton value="Users">Users</ToggleButton>
            <ToggleButton value="Content">Content</ToggleButton>
            {
              tab == "Users" ? 
                <DataGrid className={classes.dataGrid}
                  rows={(data as UserResponse).users.map((e, id) => {return {...e, signup_date: formatDate(e.signup_date), idx: id + 1}})}
                  columns={userCols}
                  checkboxSelection={true}
                />
              : (content) ?
                <DataGrid className={classes.dataGrid}
                  rows={(content as ContentResponse).content.map((e, id) => {return {...e, upload_date: formatDate(e.upload_date), id: e.content_id, idx: id + 1}})}
                  columns={contentCols}
                  checkboxSelection={true}

                />
                : null
            }
                
        </ToggleButtonGroup>
        </Box>
    );
}