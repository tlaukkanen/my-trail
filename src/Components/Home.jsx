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

    const addPoint = () => {
      const point = {lat: latitude, lon: longitude, timestamp: timestamp};
      console.log("adding " + JSON.stringify(point));
      setPoints(points => [...points, point]);
    }

    return (
        <>
            <Fragment>
                <CssBaseline />
                <Box 
                  className={classes.paper}
                  width="100%"
                  height="100%">
                    
                    <Map center={[latitude ? latitude : 61.4991, longitude ? longitude : 23.7871]} zoom={12} >
                      {points.map((point)=><Marker anchor={[point.lat, point.lon]} key={point.timestamp} payload={1} />)}
                    </Map>
                </Box>
                <AppBar position="fixed" color="secondary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit">
                            <Menu />
                        </IconButton>
                        
                        <Fab color="primary" className={classes.fabButton} onClick={addPoint}>
                            <Add />
                        </Fab>
                    </Toolbar>
                </AppBar>
            </Fragment>
        </>
    );
  
}
