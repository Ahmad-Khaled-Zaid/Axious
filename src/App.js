import React from "react";
import "./App.css";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      displayCity: "",
      lat: "",
      lon: "",
      image: "",
    };
  }
  getCityName = (event) => {
    console.log(event.target.value);
    this.setState({
      city: event.target.value,
    });
  };
  submitForm = async (event) => {
    event.preventDefault();
    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&city=${this.state.city}&format=json`;
    let response = await axios.get(url);
    this.setState({
      displayCity: response.data[0].display_name,
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    });
    let MapUrl = `https://maps.locationiq.com/v3/staticmap?key=${
      process.env.REACT_APP_KEY
    }&center=${(this.state.lat, this.state.lon)}&zoom=${12}`;
    console.log(MapUrl);
    let showMap = await axios.get(MapUrl);
    console.log(showMap.data);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label for="city">Enter city Name</label>
          <input id="city" type="text" onChange={this.getCityName}></input>
          <input type="submit" value="Explore!"></input>
        </form>
        <p>{this.state.displayCity}</p>
        <p>lat: {this.state.lat}</p>
        <p>lon: {this.state.lon}</p>
      </div>
    );
  }
}

export default App;
