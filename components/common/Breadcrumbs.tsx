import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from "next/link";


function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

type props = { currentPage: string, routes?: any[] };
export default function BasicBreadcrumbs({ currentPage, routes }: props) {


  function getRoute() {
    console.log(routes);
    if (routes == null || routes.length == 0)
      return (
        <Link color="blue" href="/">
          Home
        </Link>
      );

    return (
          routes.map((x,i) => <Link color="blue" href={x.path} key={i}>{x.name}</Link>)
        )
  }
  return (
    <div role="presentation" className='py-2' onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "12px", color: "#009AEE" }}>
        {getRoute()}
        <Typography sx={{ fontSize: "12px", color: "gray" }}>{currentPage}</Typography>
      </Breadcrumbs>
    </div>
  );
}