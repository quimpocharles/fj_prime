/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// gql
import { getProductQuery } from "services/queries.js";

import SectionLatestOffers from "./../EcommercePage/Sections/SectionLatestOffers";

const useStyles = makeStyles(productStyle);

function ProductPage(props) {
  const [colorSelect, setColorSelect] = React.useState("1");
  const [sizeSelect, setSizeSelect] = React.useState("1");
  const [sub, setSub] = React.useState();
  const [hidden, setHidden] = React.useState(true);
  const classes = useStyles();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });

  let productData;

  if (props.getProductQuery.loading) {
    productData = "loading...";
  } else {
    productData = props.getProductQuery.getProduct;
  }

  console.log(props);

  const getTotalHandler = (e) => {
    setColorSelect(e.target.value);
    setSub(parseFloat(e.target.value) * parseFloat(productData.price));
    setHidden(false);
  };

  return (
    <>
      <div className={classes.productPage}>
        <Header
          brand="FJ Primeholdings"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="info"
        />
        <Parallax image={require("assets/img/qwe.jpg")} filter="dark" small>
          <div className={classes.container}></div>
        </Parallax>
        <div className={classes.container}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer alignItems="center" justify="center">
              <GridItem md={6} sm={6}>
                <img
                  src={
                    productData === "loading..."
                      ? "/assets/img/bpapa.png"
                      : `/${productData.image_location}`
                  }
                  style={{ width: "100%" }}
                />
              </GridItem>
              <GridItem md={6} sm={6}>
                <h2 className={classes.title}>
                  {productData === "loading..."
                    ? "loading..."
                    : productData.name.toUpperCase()}
                </h2>
                <p
                  className={classes.cardDescription}
                  style={{ textAlign: "right" }}
                >
                  {productData === "loading..."
                    ? "loading..."
                    : productData.shell.name.toUpperCase() + " FLAVOR"}
                </p>
                <h3 className={classes.mainPrice}>
                  ₱{" "}
                  {productData === "loading..."
                    ? "loading..."
                    : productData.price}
                </h3>
                <GridContainer className={classes.pickSize}>
                  <GridItem md={6} sm={6}>
                    <label>Quantity</label>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <Select
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={colorSelect}
                        onChange={getTotalHandler}
                        inputProps={{
                          name: "colorSelect",
                          id: "color-select",
                        }}
                      >
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="1"
                        >
                          1
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="2"
                        >
                          2
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="3"
                        >
                          3
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="4"
                        >
                          4
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="5"
                        >
                          5
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="6"
                        >
                          6
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="7"
                        >
                          7
                        </MenuItem>

                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="8"
                        >
                          8
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="9"
                        >
                          9
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected,
                          }}
                          value="10"
                        >
                          10
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem md={6} sm={6} hidden={hidden}>
                    <label>Subtotal</label>
                    <h3 className={classes.right}>₱ {sub}</h3>
                  </GridItem>
                </GridContainer>
                <GridContainer className={classes.pullRight}>
                  <Link to="/menu">
                    <Button plain color="transparent">
                      Shop More
                    </Button>
                  </Link>
                  <Button round color="info">
                    Add to Cart &nbsp; <ShoppingCart />
                  </Button>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <SectionLatestOffers />

      <Footer
        theme="white"
        content={
          <div className={classes.right}>
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

export default graphql(getProductQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.match.params.id,
      },
    };
  },
  name: "getProductQuery",
})(ProductPage);
