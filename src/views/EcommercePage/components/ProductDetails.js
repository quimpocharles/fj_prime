import React, { useState, useEffect } from "react";
import { message } from "antd";
import { graphql } from "react-apollo";

import { makeStyles } from "@material-ui/core/styles";
import NextArrow from "@material-ui/icons/NavigateNext";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Flavors from "./Flavors";
import Quantity from "./Quantity";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";

// mutations
import { addToCartMutation } from "../../../services/mutations";

const useStyles = makeStyles(javascriptStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const ProductDetails = ({ ...props }) => {
  const [classicModal, setClassicModal] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [total, setTotal] = useState("");

  const success = () => {
    message.success("Successfully added to cart");
  };

  const error = (errorMessage) => {
    message.error(errorMessage);
  };

  const getTotal = (quantity) => {
    let productTotal = parseFloat(productPrice) * parseFloat(quantity);
    setTotal(productTotal);
  };

  const getPrice = (price) => {
    setProductPrice(price);
    getQuantity(productQuantity);
  };

  const getQuantity = (quantity) => {
    setProductQuantity(quantity);
  };

  const getCategory = (category) => {
    setCategoryId(category);
  };

  const warning = () => {
    message.warning("Please log in/register first");
  };

  const addToCartHandler = (e) => {
    e.preventDefault();

    if (!localStorage.getItem("isLoggedIn")) {
      warning();
      setTimeout(() => {
        props.history.push("/login");
      }, 3000);
    }

    // userId
    let userId = localStorage.getItem("id");
    // quantity
    let quantity = productQuantity;
    // itemId
    let productId = props.productId;

    if (categoryId === "") {
      message.error("Select a Filling");
      return false;
    } else {
      let addItem = {
        userId: userId,
        itemId: productId,
        quantity: parseInt(quantity),
        categoryId: categoryId,
      };

      // console.log(addItem);

      props
        .addToCartMutation({
          variables: addItem,
        })
        .then((res) => {
          if (!res.data.addToCart) {
            message.error("Something went wrong");
            return false;
          }
          message.success("Successfully added to cart");

          setProductPrice("");
          setProductQuantity(1);
        });
    }
  };

  useEffect(() => {
    getTotal(productQuantity);
  });

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Button
          block
          round
          onClick={() => setClassicModal(true)}
          color="info"
          className={classes.beardBorder}
        >
          Select Shell
          <NextArrow fontSize="small" />
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal,
          }}
          open={classicModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setClassicModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => setClassicModal(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.title}>{props.name.toUpperCase()}</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <Flavors
              categories={props.categories}
              name={props.name}
              getPrice={getPrice}
              getCategoryId={getCategory}
            />
            <Quantity getQuantity={getQuantity} itemTotal={total} />
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="warning" onClick={addToCartHandler}>
              Add To Cart
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>
    </GridContainer>
  );
};

export default graphql(addToCartMutation, { name: "addToCartMutation" })(
  ProductDetails
);
