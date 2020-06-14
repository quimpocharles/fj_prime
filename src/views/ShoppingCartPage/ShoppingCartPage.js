/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { message } from "antd";
import Divider from "@material-ui/core/Divider";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import List from "@material-ui/core/List";

import MenuItem from "./components/MenuItem";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

import { getCartQuery } from "services/queries.js";

const useStyles = makeStyles(shoppingCartStyle);

function ShoppingCartPage(props) {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  let cartData;
  // console.log(props);

  useEffect(() => {
    if (firstLoad) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  });

  const warning = (w) => {
    message.warning(w);
  };

  const getSubTotal = (q, p, itemId) => {
    setFirstLoad(false);
    props.data.refetch();
  };

  const getTotalHandler = (itemCartTotal) => {
    console.log(itemCartTotal);
    setTotal(itemCartTotal);
    console.log(props.data);
  };

  let cartArray;
  const getCartContents = () => {
    if (props.data.loading) {
      cartData = <p>Fetching cart...</p>;
    } else {
      if (props.data.getMember.cart === undefined) {
        cartData = <h2 className={classes.title}> Your Cart Is Empty. </h2>;
      } else {
        if (props.data.getMember.cart.length === 0) {
          cartData = <h2 className={classes.title}> Your Cart Is Empty. </h2>;
          cartArray = " ";
        } else {
          let cartTotal = 0;
          cartArray = `Total: ₱ ${total}`;
          cartData = props.data.getMember.cart.map((cartItem) => {
            if (cartItem.quantity >= 20) {
              cartTotal = cartTotal + cartItem.item.price * 20;
            } else {
              cartTotal = cartTotal + cartItem.item.price * cartItem.quantity;
            }
            // console.log("quantity " + cartItem.quantity);
            // console.log("price: " + cartItem.item.price);
            return (
              <MenuItem
                key={cartItem.item.itemId}
                itemName={cartItem.item.name}
                itemId={cartItem.itemId}
                categoryName={cartItem.item.shell.name}
                getSub={getSubTotal}
                price={cartItem.item.price}
                img={cartItem.item.image_location}
                quantity={cartItem.quantity}
                total={cartTotal}
                getTotal={getTotalHandler}
                getCart={getCartContents}
              />
            );
          });
        }
      }
    }
  };

  const classes = useStyles();

  if (!localStorage.getItem("isLoggedIn")) {
    warning("Please Log In first.");
    setTimeout(() => {
      props.history.push("/login");
    }, 3000);
  } else {
    getCartContents();
  }

  return (
    <>
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

      <Parallax image={require("assets/img/qwe.jpg")} filter="dark" small>
        <div className={classes.container}></div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={12} md={10}>
              <h6 className={classes.title}>Shopping Cart</h6>
              <GridContainer justify="center" alignItems="center">
                {cartData}
              </GridContainer>
              <h6 className={classNames(classes.title, classes.textRight)}>
                {cartArray}
              </h6>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer
        theme="white"
        content={
          <div className={classes.rightLinks}>
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
    </>
  );
}

export default graphql(getCartQuery, {
  options: (props) => {
    return {
      variables: { id: localStorage.getItem("id") },
    };
  },
})(ShoppingCartPage);
