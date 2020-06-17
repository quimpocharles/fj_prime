import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const addresses = [props.ad, props.cty, props.zip, "PH"];

  const payments = [
    { name: "Email:", detail: props.em },
    { name: "Contact Number:", detail: props.con },
  ];

  let products;
  let cartTotal = 0;

  if (props.cart === []) {
    products = [];
  } else {
    products = props.cart.map((product) => {
      // console.log(product);
      cartTotal = cartTotal + product.item.price * product.quantity;
      return (
        <ListItem className={classes.listItem} key={product.itemId}>
          <ListItemText
            primary={`${product.item.name.toUpperCase()} - ${product.item.shell.name.toUpperCase()} SHELL`}
            secondary={`Quantity: ${product.quantity}`}
          />
          <Typography variant="body2">
            {" "}
            ‎₱ {product.item.price.toFixed(2)}
          </Typography>
        </ListItem>
      );
    });

    props.gt(cartTotal);
  }

  // console.log(products);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ₱ {cartTotal.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Contact Details
          </Typography>
          <Typography
            gutterBottom
          >{`${props.fn.toUpperCase()} ${props.ln.toUpperCase()}`}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={12}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
