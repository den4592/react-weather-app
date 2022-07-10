import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle, rgba(210,188,137,1) 19%, rgba(72,167,201,1) 100%)",
    color: "#fff",
  },
  contents: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: "0 auto",
  },
  button: {
    backgroundColor: "#9982AF",
  },
  formFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: "1rem",
  },
  data: {
    marginTop: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Weather = () => {
  const classes = useStyles();
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getApi = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setCity(response.data);
        console.log(city);
      });
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getApi();
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundColor: "#9982AF" }}>
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.root}>
        {isLoading && <div>Loading...</div>}
        <Box className={classes.contents}>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="on"
            className={classes.formFlex}
          >
            <TextField
              variant="outlined"
              type="text"
              placeholder="City"
              required
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              style={{ width: "100%", marginTop: ".5rem" }}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<WbSunnyIcon></WbSunnyIcon>}
            >
              Get Weather
            </Button>
          </form>
          {city ? (
            <Box className={classes.data}>
              <Typography variant="h4">
                {city.sys.country}-{city.name}
              </Typography>
              <img
                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                width="75px"
              />
              <Typography variant="h4" style={{ fontSize: "3rem" }}>
                {Math.floor(city.main.temp - 273)}°C
              </Typography>
              <Typography variant="h6" style={{ paddingTop: "1rem" }}>
                {city.weather[0].description}
              </Typography>
            </Box>
          ) : (
            <p>No data</p>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Weather;
