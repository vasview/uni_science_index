import { Grid } from '@mui/material'
import React from 'react'
import DashboardCard from './DashboardCard';

export const DashboardCardList = (props) => {
  const { cards } = props;
  return (
    <Grid container spacing={2}>
      {cards.map((item) => (
        <DashboardCard key={item.id} {...item} />
      ))}
    </Grid>
  )
}
