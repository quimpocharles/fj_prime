/*eslint-disable*/
import React from "react";

import { graphql } from "react-apollo";
// assigned the alias compose for flowRight
import { flowRight as compose } from "lodash";
import Swal from "sweetalert2";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons

// relative imports
import {
  getCategoriesQuery,
  getCategoryQuery,
  getProductsQuery,
} from "services/queries";
import ecommerceHeader from "assets/img/jtsManok.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

// relative import
import Category from "./components/Category";
import Product from "./components/Product";

const useStyles = makeStyles(styles);

function EcommercePage(props) {
  console.log(props.data);

  let productData;

  if (props.data.loading) {
    productData = "loading...";
  } else {
    productData = props.data.getProducts.map((product) => {
      console.log(product);
      return (
        <Product
          product={product.name}
          categories={product.categories}
          key={product.id}
        />
      );
    });
  }

  const classes = useStyles();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  return (
    <div>
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
        <div className={classes.section}>
          <div className={classes.container}>
            <br />
            <GridContainer justify="center">{productData}</GridContainer>
            <br />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{
          backgroundImage: `url(${ecommerceHeader})`,
          backgroundPosition: "center",
        }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <div className={classes.textCenter}>
                <h3 className={classes.title}>JT's Manukan Online Delivery</h3>
                <p className={classes.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default graphql(getProductsQuery)(EcommercePage);
