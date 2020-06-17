/*eslint-disable*/
import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { message } from "antd";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
// core components

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

// gql
import { logInMutation } from "../../services/mutations";

import image from "assets/img/bbg.jpg";

const useStyles = makeStyles(loginPageStyle);

function LoginPage(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const success = (successMessage) => {
    message.success(successMessage);
  };

  const error = (errorMessage) => {
    message.error(errorMessage);
  };

  const warning = () => {
    message.warning("This is a warning message");
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const loginFormHandler = (e) => {
    e.preventDefault();
    // console.log("submitting");

    props
      .logInMutation({
        variables: { email: email, password: password },
      })
      .then((res) => {
        // console.log(res);

        let data = res.data.logInMember;
        // console.log(data);
        // error catch
        if (data === null) {
          // console.log("something went wrong");
          error("Authentication failed. Check the credentials.");
        } else {
          localStorage.setItem("id", data.id);
          localStorage.setItem("firstname", data.first_name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("isLoggedIn", true);
          success("Log In Successful! Welcome back, " + data.first_name);
          setTimeout(() => {
            props.history.push("/menu");
          }, 2000);
        }
      });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="FJ Primeholdings"
        links={<HeaderLinks dropdownHoverColor="warning" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "warning",
        }}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <form className={classes.form} onSubmit={loginFormHandler}>
                  <CardHeader
                    color="info"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Member LogIn</h4>
                  </CardHeader>

                  <CardBody signup>
                    <FormControl fullWidth margin="normal">
                      <InputLabel htmlFor="email">Email </InputLabel>
                      <Input
                        id="email"
                        startAdornment={
                          <InputAdornment position="start">
                            <Email fontSize="small" />
                          </InputAdornment>
                        }
                        placeholder="juandelacruz@gmail.com"
                        onChange={emailChangeHandler}
                      />
                    </FormControl>

                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="filled"
                      fullWidth
                      margin="normal"
                    >
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <Input
                        id="filled-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={changeHandlerPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <Button color="info" onClick={loginFormHandler} fullWidth>
                      Login
                    </Button>
                  </CardBody>
                </form>
                <div className={classes.textCenter}>
                  <Link to="/register">
                    <Button type="submit" color="info" simple>
                      <small>Register</small>
                    </Button>
                  </Link>
                </div>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default graphql(logInMutation, { name: "logInMutation" })(LoginPage);
