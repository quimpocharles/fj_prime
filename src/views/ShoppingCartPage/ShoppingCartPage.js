/*eslint-disable*/
import React, { useState, useEffect } from "react";
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
import CartBar from "./components/CartBar";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";

import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";

const useStyles = makeStyles(shoppingCartStyle);

export default function ShoppingCartPage() {
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);

  React.useEffect(() => {
    if (firstLoad) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  });

  const getSubTotal = (sub) => {
    setSubTotal(parseInt(subTotal) + parseInt(sub));
    setFirstLoad(false);
  };

  useEffect(() => {
    console.log(subTotal);
  });

  const classes = useStyles();
  return (
    <div>
      <Header
        brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "danger",
        }}
      />
      <Parallax image={require("assets/img/jtsManok.jpg")} filter="dark">
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
                <h1 className={classes.title}>Select Your Order</h1>
                <h4>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={12} md={8}>
              <List>
                <MenuItem itemName="Paa" price={148} getSub={getSubTotal} />
                <MenuItem itemName="Pecho" price={135} getSub={getSubTotal} />
                <MenuItem itemName="Pakpak" price={110} getSub={getSubTotal} />
                <MenuItem
                  itemName="Chicken Sisig"
                  price={200}
                  getSub={getSubTotal}
                />
                <MenuItem
                  itemName="Chicken Sisig w/ Egg"
                  price={220}
                  getSub={getSubTotal}
                />
              </List>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <CartBar />
    </div>
  );
}
