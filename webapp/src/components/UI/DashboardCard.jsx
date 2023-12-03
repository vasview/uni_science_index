import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function DashboardCard(props) {
  const { title, number, link } = props;

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography 
            variant='h5' 
            component="div"
            sx={{ mb: 1, minHeight: 50 }}
          >
            {title}
          </Typography>
          <Typography 
            variant='h6'
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            Кол-во: {number}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            variant='contained'
            size="small"
            component={Link}
            to={link}
            sx={{ 
              fontSize: 14,
              flexGrow: 1
            }}
          >
            Просмотреть
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default DashboardCard