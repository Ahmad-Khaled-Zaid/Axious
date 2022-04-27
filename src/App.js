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
      displayContent: false,
    };
  }
  getCityName = (event) => {
    this.setState({
      city: event.target.value,
    });
  };
  submitForm = async (event) => {
    event.preventDefault();
    try {
      let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&city=${this.state.city}&format=json`;
      let response = await axios.get(url);
      let weatherReq = `http://localhost:3003/weather?searchQuery=${this.state.city}`;
      let response2 = await axios.get(weatherReq);
      console.log(response2);
      console.log(response);
      this.setState({
        displayCity: response.data[0].display_name,
        lat: response.data[0].lat,
        lon: response.data[0].lon,
        displayContent: true,
      });
    } catch (error) {
      this.setState({
        displayContent: false,
      });
      alert(error);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label for="city">Enter city Name</label>
          <input id="city" type="text" onChange={this.getCityName}></input>
          <input type="submit" value="Explore!"></input>
        </form>
        {this.state.displayContent && (
          <div>
            <p>{this.state.displayCity}</p>
            <p> {this.state.lat}</p>
            <p> {this.state.lon}</p>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}&zoom=7`}
              alt={`${this.state.city} map`}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
