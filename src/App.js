import React from 'react';
import ReactGA from 'react-ga';
import Axios from 'axios';
import './App.css';
import styles from './material_ui/Styles.js';
import attachShakeEventToLink from './animation/shake.js';
import { GAEvent } from "./tracking/Events";
import WeatherPanel from './panels/WeatherPanel';
import { Paper, Grid, Typography, TextField, Button, FormControl, FormGroup, FormControlLabel, CheckBox} from './material_ui/Components.js';

class App extends React.Component {
  state = {
    zipcode: '',
    weatherDataSet: false,
    termsAccepted: false,
    userState: '',
    userCity: '',
    weatherImgLink: '',
    currentTemperature: '',
    highTemperature: '',
    lowTemperature: '',
    description: ''
  };

  componentDidMount() {
    Axios.get('https://j9l4zglte4.execute-api.us-east-1.amazonaws.com/api/ctl/weather')
    .then(({ data })=> {
      if(data && data.today) {
        this.setState({
          userState: data.today.state,
          userCity: data.today.city,
          weatherImgLink: data.today.iconLink,
          currentTemperature: this.parseTemperature(data.today.temperature),
          highTemperature: this.parseTemperature(data.today.highTemperature),
          lowTemperature: this.parseTemperature(data.today.lowTemperature),
          description: data.today.description,
          weatherDataSet: true
        });
        attachShakeEventToLink();
      }
    })
    .catch((error) => {
      console.error(error);
    });

    ReactGA.initialize('UA-139528681-1');
    ReactGA.pageview('/homepage');
  }

  handleZipCodeChange = event => {
    this.setState({
      zipcode: event.target.value,
    });
  };

  handleTermsAcceptanceChange = () => {
    let termsAcceptanceState = this.state.termsAccepted;
    this.setState({
      termsAccepted: !termsAcceptanceState,
    });
  };

  parseTemperature = (num) => {
    return (Number(num)) ? parseInt(num) : '';
  };

  disableSignUpButton = () => {
    let termsAccepted = this.state.termsAccepted;
    let zipcodeValue = this.state.zipcode;
    return !termsAccepted || zipcodeValue.length !== 5;
  }

  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item sn={12} md={7} style={styles.InfoPaper}>
            {this.state.weatherDataSet ?
              <WeatherPanel
                userCity={this.state.userCity} 
                userState={this.state.userState} 
                weatherImgLink={this.state.weatherImgLink} 
                currentTemperature={this.state.currentTemperature} 
                description={this.state.description} 
                lowTemperature={this.state.lowTemperature} 
                highTemperature={this.state.highTemperature} 
              />
            : ''} 
          </Grid>
          <Grid item sm={12} md={5}>
            <Paper style={styles.ActionPaper} id="action_panel">
              <Typography component="h2" variant="display2" style={styles.LightText} gutterBottom>
                Instant weather data at your finger tips
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  id="zipcode"
                  label="Zipcode"
                  type="number"
                  value={this.state.zipcode}
                  onChange={this.handleZipCodeChange}
                  margin="normal"
                />
              </form>
              <br/>
              <FormControl component="fieldset">
                <FormGroup>
                  <a href="#">
                    <FormControlLabel
                      control={
                        <CheckBox checked={this.state.termsAccepted} onChange={this.handleTermsAcceptanceChange}/>
                      }
                      label="I accept terms and conditions"
                    />
                  </a>
                </FormGroup>
              </FormControl>
              <br/>
              <br/>
              <Button 
                variant="raised"
                size="large" 
                color="secondary"
                disabled={this.disableSignUpButton()}
                onClick={()=> GAEvent("Landing Page - sign up", "User clicked on sign up button", "LANDING_PAGE")}>
                  Sign Up
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
