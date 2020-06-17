import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function AddressForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [contact, setContact] = useState("");
  const [flag, setFlag] = useState(false);

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
    props.fn(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
    props.ln(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
    props.em(e.target.value);
  };

  const addChangeHandler = (e) => {
    setAddress(e.target.value);
    props.ad(e.target.value);
  };

  const cityChangeHandler = (e) => {
    setCity(e.target.value);
    props.cty(e.target.value);
  };

  const zipChangeHandler = (e) => {
    setZip(e.target.value);
    props.zip(e.target.value);
  };

  const contactChangeHandler = (e) => {
    let contactNumber = e.target.value;
    if (!isNaN(contactNumber)) {
      setContact(contactNumber);
      props.con(e.target.value);
    } else {
      setFlag(true);
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Contact Details{" "}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            onChange={firstNameChangeHandler}
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            onChange={lastNameChangeHandler}
            value={lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={addChangeHandler}
            value={address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            onChange={cityChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip Code"
            value={zip}
            fullWidth
            required
            onChange={zipChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="email"
            id="email"
            name="email"
            label="Email"
            value={email}
            fullWidth
            onChange={emailChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contact"
            name="contact"
            label="Contact Number"
            placeholder="09123456789"
            error={flag}
            onChange={contactChangeHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
