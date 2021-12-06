import React, { useState, useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridRowId, } from '@mui/x-data-grid';
import { getAllAudioBooks } from '../services/content';
import { adminDeleteContent, adminDeleteUser, adminViewUsers } from '../services/admin';
import { useData } from '../hooks/useData';
import { User, UserResponse } from '../types/admin';
import { ContentResponse } from '../types/content';
import { formatDate } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/admin-panel.jpg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: "flex",
    justifyContent: 'center',
    flexDirection: "column",
  },
  dataGrid: {
    marginRight: "20px",
    marginLeft: "20px",
  },
  buttonsContainer: {
    marginBottom: "20px"
  },
  grid: {
    backgroundColor: "white"
  },
  buttonsBar: {
    display: "flex",
    justifyContent: 'center',
    flexDirection: 'row'
  }
}))


const formatDateWithHour = (date: Date): string => {
  return `${formatDate(date)} ${new Date(date).toLocaleTimeString("en-US", {
    timeZone: "Europe/Bucharest",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  })}`
}

export function AdminPanel() {
  const classes = useStyles();

  const [tab, setTab] = useState("Users");
  const [reload, setReload] = useState(false);
  const { data, isLoading } = useData<UserResponse | ContentResponse>(tab === 'Users' ? adminViewUsers : getAllAudioBooks, [reload]);
  const [content, SetContent] = useState<ContentResponse>();

  const [selectionUser, setSelectionUser] = useState<GridRowId[]>([]);
  const [selectionContent, setSelectionContent] = useState<GridRowId[]>([]);

  const dataGridProps = {
    disableColumnFilter: true,
    disableColumnMenu: true,
    disableVirtualization: true,
    hideFooterPagination: true,
    hideFooterSelectedRowCount: false,
    autoHeight: true,
    pageSize: 25
  }

  const userCols = [
    { field: 'idx', headerName: "No", width: 60 },
    { field: 'id', headerName: "Id", width: 300 },
    { field: 'username', headerName: "Name", width: 150 },
    { field: 'role', headerName: "Role", width: 100 },
    { field: 'profile_description', headerName: "Description", width: 300 },
    { field: 'signup_date', headerName: "Registered At", width: 200 },
    { field: 'last_signin', headerName: "Last Login", width: 250 }
  ]

  const contentCols = [
    { field: 'idx', headerName: "No", width: 60 },
    { field: 'id', headerName: "Id", width: 300 },
    { field: 'creator_name', headerName: "Creator Name", width: 150 },
    { field: 'book_title', headerName: "Title", minWidth: 250 },
    { field: 'book_author', headerName: "Author", width: 200 },
    { field: 'review', headerName: "Rating", width: 100 },
    { field: 'upload_date', headerName: "Upload Date", minWidth: 200 },
  ]
  useEffect(() => {
    setReload(!reload);
  }, [])

  const handleChange = () => {
    if (tab === "Users") {
      setTab("Content");
      getAllAudioBooks()
        .then((res) => SetContent(res))
        .catch((e) => { });
    } else {
      setTab("Users");
    }
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonsBar}>
        <div style={{ width: '43%' }}></div>
        <div>
          <ToggleButtonGroup
            color="primary"
            exclusive
            className={classes.buttonsContainer}
            sx={{ alignSelf: 'flex-end' }}
            value={tab}
            onChange={handleChange}>
            <ToggleButton value="Users">Users</ToggleButton>
            <ToggleButton value="Content">Content</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ marginRight: "10px" }}>
          {
            tab === 'Users' ? (
              selectionUser?.length === 0 ?
                <Button variant={'contained'} disabled >Delete Selected</Button> :
                <Button variant={'contained'} onClick={() => {
                  selectionUser.forEach(e => {
                    adminDeleteUser(String(e))
                      .then(r => r)
                      .catch(err => err)
                    window.location.reload();
                  });
                }}>Delete Selected</Button>
            ) : (
              selectionContent?.length === 0 ?
                <Button variant={'contained'} disabled >Delete Selected</Button> :
                <Button variant={'contained'} onClick={() => {
                  selectionContent.forEach(e => adminDeleteContent(String(e)).then(r => r).catch(err => err))
                  window.location.reload();
                }}>Delete Selected</Button>
            )
          }
        </div>
      </div>

      <div className={classes.grid}>
        {
          tab === "Users" ?
            <DataGrid className={classes.dataGrid}
              {...dataGridProps}
              rows={(data as UserResponse).users.map((e, id) => { return { ...e, signup_date: formatDate(e.signup_date), last_signin: formatDateWithHour(e.last_signin), idx: id + 1, profile_description: !e.profile_description ? 'Empty' : e.profile_description } })}
              columns={userCols}
              checkboxSelection={true}
              selectionModel={selectionUser}
              onSelectionModelChange={setSelectionUser}
            />
            : (content) ?
              <DataGrid className={classes.dataGrid}
                {...dataGridProps}
                rows={(content as ContentResponse).content.map((e, id) => { return { ...e, upload_date: formatDateWithHour(e.upload_date), id: e.content_id, idx: id + 1 } })}
                columns={contentCols}
                checkboxSelection={true}
                selectionModel={selectionContent}
                onSelectionModelChange={setSelectionContent}
              />
              : null
        }
      </div>
    </div>
  );
}