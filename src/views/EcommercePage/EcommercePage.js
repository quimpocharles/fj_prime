/*eslint-disable*/
import React, { useState } from "react";

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
import SectionLatestOffers from "./Sections/SectionLatestOffers";
import SectionProducts from "./Sections/SectionProducts";

// @material-ui/core components
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons

// relative imports
import {
  getCategoriesQuery,
  getCategoryQuery,
  getProductsQuery,
} from "services/queries";
import mainBg from "assets/img/bg01.png";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceStyle.js";

// relative import
import Category from "./components/Category";
import Product from "./components/Product";

const useStyles = makeStyles(styles);

function EcommercePage(props) {
  // console.log(props.data);
  const [cart, setCart] = useState([]);

  let productData;

  if (props.data.loading) {
    productData = "loading...";
  } else {
    productData = props.data.getProducts;
  }

  const classes = useStyles();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

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
                  One step closer to enjoying your favorite cream puffs at home.
                </h4>
                <h4>Select a cream puff flavor then select the shell.</h4>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ backgroundImage: `url(${mainBg})` }}
      >
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <SectionProducts products={productData} />
            </GridContainer>
            <br />
          </div>
        </div>
      </div>
      <SectionLatestOffers />

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

export default graphql(getProductsQuery)(EcommercePage);
