/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FilledInput from "@material-ui/core/FilledInput";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { graphql } from "react-apollo";
import { message } from "antd";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Iphone from "@material-ui/icons/PhoneIphoneOutlined";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// mutations
import { createMemberMutation } from "../../services/mutations";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";

import image from "assets/img/bbg.jpg";

const useStyles = makeStyles(signupPageStyle);

function SignUpPage({ ...rest }) {
  const [checked, setChecked] = useState([1]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  console.log(rest);

  const success = (successMessage) => {
    message.success(successMessage);
  };

  const error = (errorMessage) => {
    message.error(errorMessage);
  };

  const warning = () => {
    message.warning("This is a warning message");
  };

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });

  const getFormData = (e) => {
    console.log(formData);
  };

  const firstNameChangeHandler = (e) => {
    setFName(e.target.value);
    console.log(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setLName(e.target.value);
    console.log(e.target.value);
  };

  const contactChangeHandler = (e) => {
    setContact(e.target.value);
    console.log(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changeHandlerConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const registerFormHandler = (e) => {
    e.preventDefault();

    if (fName === "") {
      error("Please enter your first name");
      return false;
    }

    if (lName === "") {
      error("Please enter your last name");
      return false;
    }
    if (!email.includes("@")) {
      error("Please enter your email");
      return false;
    }

    if (checked.length < 1) {
      error("Please make sure to agree with our terms and conditions");
      return false;
    }

    if (contact.length < 11) {
      error("Please input your mobile number");
      return false;
    }

    if (password.length < 8) {
      error("Password Must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      error("Passwords do not match");
      return false;
    }

    let formData = {
      first_name: fName,
      last_name: lName,
      address: "PH",
      email: email,
      contact_number: contact,
      password: password,
      username: "regular_user",
    };

    rest
      .createMemberMutation({
        variables: formData,
      })
      .then((res) => {
        console.log(res);
        // if there is an error
        if (res.data.createMember === null) {
          error("Something went wrong. Kindly register again");
        } else {
          success(
            `successfully registered the email: ${res.data.createMember.email}. Welcome, ${res.data.createMember.first_name}!`
          );
          setTimeout(() => {
            rest.history.push("/login");
          }, 2500);
        }
      });
  };

  const classes = useStyles();
  return (
    <div>
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
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <InfoArea
                        className={classes.infoArea}
                        title="Choose your order"
                        description="Whether you're craving for Boba Girl's Milk Tea or Beard Papa's Cream puffs, we got you covered."
                        icon={Timeline}
                        iconColor="rose"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Pay Online"
                        description="Our Web App has a secured online built-in payment gateway which allows you to pay in a few clicks."
                        icon={Code}
                        iconColor="primary"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Enjoy your order!"
                        description="Have your order picked up by your favorite courier and wait for your favorites right at your doorstep."
                        icon={Group}
                        iconColor="info"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form
                        className={classes.form}
                        onSubmit={registerFormHandler}
                      >
                        <FormControl fullWidth margin="normal">
                          <InputLabel htmlFor="firstName">
                            First Name
                          </InputLabel>
                          <Input
                            id="firstName"
                            startAdornment={
                              <InputAdornment position="start">
                                <AccountCircle fontSize="small" />
                              </InputAdornment>
                            }
                            placeholder="Juan"
                            onChange={firstNameChangeHandler}
                          />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <InputLabel htmlFor="lastName">Last Name</InputLabel>
                          <Input
                            id="lastName"
                            startAdornment={
                              <InputAdornment position="start">
                                <AccountCircle fontSize="small" />
                              </InputAdornment>
                            }
                            placeholder="Dela Cruz"
                            onChange={lastNameChangeHandler}
                          />
                        </FormControl>

                        <FormControl fullWidth margin="normal">
                          <InputLabel htmlFor="contact">
                            Mobile Number
                          </InputLabel>
                          <Input
                            id="contact"
                            startAdornment={
                              <InputAdornment position="start">
                                <Iphone fontSize="small" />
                              </InputAdornment>
                            }
                            placeholder="0919888****"
                            onChange={contactChangeHandler}
                          />
                        </FormControl>

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

                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          variant="filled"
                          fullWidth
                          margin="normal"
                        >
                          <InputLabel htmlFor="filled-adornment-password">
                            Confirm Password
                          </InputLabel>
                          <Input
                            id="filled-adornment-password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={changeHandlerConfirmPassword}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownConfirmPassword}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                        <FormControlLabel
                          classes={{
                            label: classes.label,
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(1)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot,
                              }}
                              checked={checked.indexOf(1) !== -1 ? true : false}
                            />
                          }
                          label={
                            <span>
                              I agree to the{" "}
                              <a href="#pablo" className={classes.termsLink}>
                                terms and conditions
                              </a>
                              .
                            </span>
                          }
                        />
                        <div className={classes.textCenter}>
                          <Button type="submit" round color="info" fullWidth>
                            Get started
                          </Button>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default graphql(createMemberMutation, { name: "createMemberMutation" })(
  SignUpPage
);
