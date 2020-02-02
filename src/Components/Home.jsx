import React, { Fragment, useState } from 'react';
import { Button, AppBar, Toolbar, IconButton, Paper, Fab, CssBaseline, Box } from '@material-ui/core';
import { Add, Menu } from '@material-ui/icons';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { usePosition } from 'use-position';

const useStyles = makeStyles(theme => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));
  

export default function Home(props) {
    const classes = useStyles();
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true, {enableHighAccuracy: true});
    const [points, setPoints] = useState([]);

    const renderPoints = () => {
      return points.map((point)=><Marker anchor={[point.lat, point.lon]} payload={1} />)
    }

    const addPoint = () => {
      setPoints(points => [...points, {latitude, longitude}]);
    }

    return (
        <>
            <Fragment height="100%">
                <CssBaseline />
                <Box 
                  className={classes.paper}
                  width="100%"
                  height="100%"
                  border="1px solid red">
                    
                    <Map center={[latitude ? latitude : 61.4991, longitude ? longitude : 23.7871]} zoom={12} >
                      <Marker anchor={[latitude ? latitude : 61.4991, longitude ? longitude : 23.7871]} payload={1} />
                      {renderPoints}
                    </Map>
                </Box>
                <AppBar position="fixed" color="secondary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={addPoint}>
                            <Menu />
                        </IconButton>
                        
                        <Fab color="primary" className={classes.fabButton}>
                            <Add />
                        </Fab>
                    </Toolbar>
                </AppBar>
            </Fragment>
        </>
    );
  
}
