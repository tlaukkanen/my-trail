import React, { Fragment, useState } from 'react';
import { Button, AppBar, Toolbar, IconButton, Paper, Fab, CssBaseline, Box, Hidden } from '@material-ui/core';
import { Add, Menu, PlayCircleFilled, PauseCircleFilled } from '@material-ui/icons';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { usePosition } from 'use-position';
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();

// This key should be changed on any other site.
// Currently it's 
const MAPTILER_KEY = "rX05MWvUbZEeG85LyLgS";

const useStyles = makeStyles(theme => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      //paddingBottom: 50,
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
      position: 'fixed',
      zIndex: 1,
      bottom: 30,
      left: "50%",
      margin: '0 auto',
      transform: "translateX(-50%)"
    },
  }));
  

export default function Home(props) {
    const classes = useStyles();
    const { latitude, longitude, timestamp, accuracy, error } = usePosition(true);
    const [points, setPoints] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [trail, setTrail] = useState({
      distance: 0.0,
      durationMin: 0.0
    });

    const addPoint = () => {
      const point = {lat: latitude, lon: longitude, timestamp: timestamp};
      console.log("adding " + JSON.stringify(point));
      setPoints(points => [...points, point]);
    }

    const maptiler = (x, y, z) => {
      return `https://api.maptiler.com/maps/streets/${z}/${x}/${y}.png?key=${MAPTILER_KEY}`;
    }

    const toggleTracking = () => {
      setIsTracking(!isTracking);
      if(isTracking) {
        noSleep.enable();
      } else {
        noSleep.disable();
      }
    }

    const drawMarker = () => {
      if(isTracking) {
        console.log("draw");
        return (
          <Marker anchor={[latitude, longitude]} payload={1} />
        );
      } else {
        console.log("nodraw");
        return <></>;
      }

    }

    const drawToggle = () => {
      if(isTracking) {
        return( <PauseCircleFilled fontSize="large"/> );
      } else {
        return( <PlayCircleFilled fontSize="large"/> );
      }
    }

    //{points.map((point)=><Marker anchor={[point.lat, point.lon]} key={point.timestamp} payload={1} />)}
    return (
        <>
            <Fragment>
                <CssBaseline />
                
                <Box 
                  className={classes.paper}
                  width="100%"
                  height="100%">
                    
                    <Map 
                        center={[latitude ? latitude : 61.4991, longitude ? longitude : 23.7871]} 
                        zoom={12} 
                        provider={maptiler}>
                      {drawMarker()}
                    </Map>
                </Box>
                <IconButton size="medium" className={classes.fabButton} onClick={toggleTracking}>
                  {drawToggle()}
                </IconButton>
            </Fragment>
        </>
    );
  
}
