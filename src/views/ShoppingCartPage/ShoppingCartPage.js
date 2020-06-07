/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { message } from "antd";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import List from "@material-ui/core/List";

import MenuItem from "./components/MenuItem";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

import { getCartQuery } from "./../../services/queries.js";

const useStyles = makeStyles(shoppingCartStyle);

function ShoppingCartPage(props) {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  let cartData;

  useEffect(() => {
    if (firstLoad) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  });

  const warning = (w) => {
    message.warning(w);
  };

  if (!localStorage.getItem("isLoggedIn")) {
    warning("Please Log In first.");
    setTimeout(() => {
      props.history.push("/login");
    }, 3000);
  } else {
    if (props.data.loading) {
      cartData = <p>Fetching cart...</p>;
    } else {
      console.log(props);
      if (props.data.getMember.cart === undefined) {
        cartData = "Cart is empty";
      } else {
        props.data.getMember.cart.map((cartItem) => {
          // console.log(cartItem);
          cartData = cartItem.category.map((category) => {
            if (category === null) {
            } else {
              console.log(category);
              return (
                <MenuItem
                  key={category.id}
                  itemName={cartItem.item.name}
                  categoryName={category.name}
                  getSub={cartItem.quantity * category.price}
                />
              );
            }
          });
        });
      }
    }
  }

  const getSubTotal = (sub) => {
    setSubTotal(parseInt(subTotal) + parseInt(sub));
    setFirstLoad(false);
  };
  const classes = useStyles();

  return (
    <>
      <Header
        brand="FJ Primeholdings"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "info",
        }}
      />

      <Parallax image={require("assets/img/qwe.jpg")} filter="dark" small>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={8}
              sm={8}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}> Cart Page </h1>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={12} md={12}>
              <List>{cartData}</List>
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
