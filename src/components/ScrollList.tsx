import { Button, Card, Grid, CardActions, CardContent, CardMedia, Rating, Select, MenuItem, FormControl, } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/search';
import { useData } from '../hooks/useData';
import { Content, ContentResponse } from '../types/content';
import { urls, useRouting } from '../routing';
import { getAllAudioBooks } from '../services/content';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles((theme: any) => ({
  scrollRoot: {
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
    position: 'relative'
  },
  paper: {
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
    display: 'flex',
    height: "250px",
    width: '70vw',
    marginTop: '20px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%"
  },
  selection: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white
  }
}));


const DisplayContent = (p: { content: Content, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

  const { routeTo } = useRouting();
  const classes = useStyles();

  const getPastDays = (upload: Date) => {
    return ((Date.now() - (new Date(upload)).getTime()) / (24 * 3600 * 1000)).toFixed(0);
  }

  return (<Card className={classes.cardRoot}>
    <CardMedia
      sx={{ width: "300px" }}
      component="img"
      image="https://picsum.photos/200/200"
    />
    <Box className={classes.container}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="h3" >{p.content.book_title}</Typography>
        <Typography variant="h6">Written By: {p.content.book_author}</Typography>
        <Typography variant="h6">Narrated By: {p.content.creator_name}</Typography>
        <Typography>Uploaded {getPastDays(p.content.upload_date) === "0" ? "Today" : `${getPastDays(p.content.upload_date)} days ago`}<br /></Typography>
        {
          p.content.review === 0 ?
            <Typography><i>No reviews</i></Typography>
            : <Rating value={p.content.review} readOnly ></Rating>
        }
      </CardContent>
      <CardActions>
        <Button variant='outlined' size="small" color="primary" onClick={() => routeTo(urls.contentEntityPage, { id: p.content.content_id })}>
          More Details
        </Button>
      </CardActions>
    </Box>
  </Card>)
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: "15px",
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '40vw',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const SearchBar = (p: { numOfContent: Number }) => {
  const [,setSearchWord] = useContext(SearchContext);
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus={true}
          placeholder={`Search from ${p.numOfContent} audiobooks...`}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
            setSearchWord(e.target.value);
          }}
          value={searchText}
          />
      </Search>
    </div>
  )
}

export const ScrollList = () => {
  const [reload, setReload] = useState(false);
  const [searchWord,] = useContext(SearchContext);
  const { data, isLoading } = useData((getAllAudioBooks), [reload]);

  const classes = useStyles();

  const filterContent = (data: ContentResponse | undefined, searchWord: string): Content[] => {
    if (!data || !data.content ) return [];
    if(!searchWord) return data.content.sort((a, b) => a.book_title.localeCompare(b.book_title));
    const dataArray: Content[] = data.content.sort((a, b) => a.book_title.localeCompare(b.book_title));
    
    const filteredData = dataArray.filter(e => 
      e.book_title.toLowerCase().includes(searchWord.toLowerCase()) || 
      e.book_author.toLowerCase().includes(searchWord.toLowerCase()) || 
      e.creator_name.toLowerCase().includes(searchWord.toLowerCase())
    )
    return filteredData
  }

  useEffect(() => {
    setReload(!reload);
  }, [])

  if (isLoading) {
    return <div></div>;
  }


  return <div className={classes.scrollRoot}>
    <div className={classes.paper}>
      <SearchBar numOfContent={data?.found || 0} />
      <Grid item xs={11} style={{ paddingBottom: "13vh" }}>
        { filterContent(data, searchWord).length === 0 ? 
        <div>
          <Card sx={{
                display: 'flex',
                height: "40px",
                width: '20vw',
                marginTop: '20px',
                alignItems: 'center',
                flexDirection: 'column',
          }}>
            <Typography variant='h5'>No content found</Typography> 
          </Card>
        </div> :
          filterContent(data, searchWord).map((content) =>
            <div key={content.content_id}>
              <DisplayContent content={content} setReload={setReload} reload={reload} />
            </div>
          )}
      </Grid>
    </div>
  </div>
}