import React from 'react';
import './App.css';
import styles from './material_ui/Styles.js';
import attachShakeToLink from './animation/shake.js';
import { Paper, Grid, Typography, TextField, Button, FormControl, FormGroup, FormControlLabel, FormHelperText, CheckBox} from './material_ui/Components.js';
import Axios from 'axios';

class App extends React.Component {
  state = {
    zipcode: '',
    termsAccepted: false,
    error: false,
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
      console.log(data.today);

      this.setState({
        userState: data.today.state,
        userCity: data.today.city,
        weatherImgLink: data.today.iconLink,
        currentTemperature: data.today.temperature,
        highTemperature: data.today.highTemperature,
        lowTemperature: data.today.lowTemperature,
        description: data.today.description
      });
    });

    attachShakeToLink();
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

  render() {
    return (
      <div className="App">
        <Grid container spacing={24}>
          <Grid item md={7} style={styles.InfoPaper}>
              <Typography component="h2" variant="display1" gutterBottom>
                {this.state.userCity}, {this.state.userState}
              </Typography>
              <Grid container spacing={24}>
                <Grid item md={12}>
                  <img src={this.state.weatherImgLink} alt="weather icon"/>
                  <Typography component="h2" variant="display4">
                    {this.parseTemperature(this.state.currentTemperature)}&deg;
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="caption" gutterBottom>
                    {this.state.description}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                <Typography variant="caption" gutterBottom>
                    Low
                  </Typography>
                  <Typography component="h2" variant="display3">
                    {this.parseTemperature(this.state.lowTemperature)}&deg;
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="caption" gutterBottom>
                    High
                  </Typography>
                  <Typography component="h2" variant="display3">
                    {this.parseTemperature(this.state.highTemperature)}&deg;
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="subheading" style={styles.ActionLink} id="see_more">
                    See more..
                  </Typography>
                </Grid>
              </Grid>
          </Grid>
          <Grid item md={5}>
            <Paper style={styles.ActionPaper} id="action_panel">
              <Typography component="h2" variant="display2" style={styles.LightText} gutterBottom>
                Instant weather data at your finger tips
              </Typography>
              <form noValidate autoComplete="off">
                <TextField
                  id="zipcode"
                  label="Zipcode"
                  type="search"
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
                        <CheckBox checked={this.state.termsAccepted} onChange={this.handleTermsAcceptanceChange} value="gilad" />
                      }
                      label="I accept terms and conditions"
                    />
                  </a>
                </FormGroup>
                {this.state.error ? <FormHelperText style={styles.LightText}>Please select terms and conditions</FormHelperText> : ''}
              </FormControl>
              <br/>
              <Button variant="contained" color="primary">
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
