import React from 'react';
import { GAEvent } from "../tracking/Events";
import { Grid, Typography } from '../material_ui/Components.js';
import styles from '../material_ui/Styles';

const WeatherPanel = ({
        userCity, 
        userState, 
        weatherImgLink, 
        currentTemperature, 
        description,
        lowTemperature,
        highTemperature
    }) => (
        <div>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Typography component="h2" variant="display1" gutterBottom>
                        {userCity}, {userState}
                    </Typography>
                    <img src={weatherImgLink} alt="weather icon"/>
                    <Typography component="h2" variant="display4">
                        {currentTemperature}&deg;
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="caption" gutterBottom>
                    Low
                    </Typography>
                    <Typography component="h2" variant="display3">
                        {lowTemperature}&deg;
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="caption" gutterBottom>
                    High
                    </Typography>
                    <Typography component="h2" variant="display3">
                        {highTemperature}&deg;
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography 
                    variant="subheading" 
                    style={styles.ActionLink} 
                    id="see_more"
                    onClick={()=> GAEvent("Landing Page - see more", "User clicked on see more link", "LANDING_PAGE")}
                    >
                    See more..
                    </Typography>
                </Grid>
            </Grid>
        </div>
);


export default WeatherPanel;