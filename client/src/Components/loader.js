import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';




export default function Loader() {

  return (
    <>
    <div  style={{height:"100vh"}}>
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="success" style={{margin:"200px auto auto auto",color:"rgb(37, 165, 65)"}}/>
    </Stack>
    </div>
    </>
  );
}