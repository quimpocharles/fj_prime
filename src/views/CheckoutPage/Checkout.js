import React, { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import paymaya from "paymaya-js-sdk";

import { makeStyles } from "@material-ui/core/styles";
import { graphql } from "react-apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Footer from "components/Footer/Footer.js";

// relative
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { getCartQuery } from "services/queries.js";
import cardDetails from "helpers/cardDetails";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: "20vh",

    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  textRight: {
    textAlign: "right",
  },
}));

const steps = ["Contact Details", "Review your order", "Finalize your order"];

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState("");

  let cartArray;

  if (props.data.loading) {
    cartArray = [];
  } else {
    cartArray = props.data.getMember.cart;
  }

  const handleNext = () => {
    // console.log(activeStep);
    if (activeStep === 1) {
      if (parseFloat(total) > 100) {
        let transactionId =
          "FH-" +
          uuidv1().slice(0, 8) +
          "-" +
          lastName.slice(0, 3).toUpperCase() +
          firstName.slice(0, 2).toUpperCase();
        setOrderId(transactionId);

        setTimeout(() => {
          cardDetails(
            total,
            firstName,
            lastName,
            contact,
            email,
            address,
            city,
            zip,
            cartArray,
            transactionId
          );
        }, 5000);
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getFirstName = (v) => {
    setFirstName(v);
  };

  const getLastName = (v) => {
    setLastName(v);
  };
  const getAddress = (v) => {
    setAddress(v);
  };

  const getZip = (v) => {
    setZip(v);
  };

  const getEmail = (v) => {
    setEmail(v);
  };

  const getContact = (v) => {
    setContact(v);
  };
  const getCity = (v) => {
    setCity(v);
  };

  const getTotal = (v) => {
    setTotal(v);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            fn={getFirstName}
            ln={getLastName}
            ad={getAddress}
            zip={getZip}
            em={getEmail}
            con={getContact}
            cty={getCity}
          />
        );
      case 1:
        return (
          <Review
            fn={firstName}
            ln={lastName}
            ad={address}
            zip={zip}
            em={email}
            con={contact}
            cty={city}
            cart={cartArray}
            gt={getTotal}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  useEffect(() => {
    paymaya.init("pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah", true);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header
        brand="FJ Primeholdings"
        links={<HeaderLinks dropdownHoverColor="warning" />}
        fixed
        color="warning"
      />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.title}
          >
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length - 1 ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is <strong>{orderId}</strong>. You will now
                  be redirected to the <strong>Paymaya </strong> payment
                  gateway.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 2 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
      <Footer
        content={
          <div className={classes.textRight}>
            <p className={classes.cqStudios}>
              &copy; {1900 + new Date().getYear()} , Let{"'"}s make websites
              great again.{" "}
              <span className="cqBrand">
                <a
                  href="https://www.linkedin.com/in/charlesquimpo"
                  target="_blank"
                >
                  <em>CQ Studios</em>
                </a>
              </span>
            </p>
          </div>
        }
      />
    </React.Fragment>
  );
}

export default graphql(getCartQuery, {
  options: (props) => {
    return {
      variables: { id: localStorage.getItem("id") },
    };
  },
})(Checkout);
