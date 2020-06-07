/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { flowRight as compose } from "lodash";
import { message } from "antd";

import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";

// relative imports
import SectionLatestOffers from "./../EcommercePage/Sections/SectionLatestOffers";

// gql
import { getProductQuery, getCartQuery } from "services/queries.js";
import { addToCartMutation } from "services/mutations";

// style imports
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

const useStyles = makeStyles(productStyle);

function ProductPage(props) {
  const [colorSelect, setColorSelect] = React.useState("1");
  const [sub, setSub] = React.useState();
  const [hidden, setHidden] = React.useState(true);
  const classes = useStyles();

  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });

  const success = () => {
    message.success("Successfully added to cart");
  };

  const error = (errorMessage) => {
    message.error(errorMessage);
  };

  let productData;

  if (props.getProductQuery.loading) {
    productData = "loading...";
  } else {
    productData = props.getProductQuery.getProduct;
  }

  const getTotalHandler = (e) => {
    setColorSelect(e.target.value);
    setSub(parseFloat(e.target.value) * parseFloat(productData.price));
    setHidden(false);
  };

  const addToCartHandler = (e) => {
    // id of logged in user
    let userID = localStorage.getItem("id");

    // quantity being added to cart
    let quantity = colorSelect;

    // product being added to cart
    let productID = props.match.params.id;

    let cartItem = {
      userId: userID,
      itemId: productID,
      quantity: parseInt(quantity),
      categoryId: props.getProductQuery.getProduct.categoryId,
    };

    // add to cart mutation
    props
      .addToCartMutation({
        variables: cartItem,
        refetchQueries: [
          {
            query: getCartQuery,
            variables: { id: localStorage.getItem("id") },
          },
        ],
      })
      .then((res) => {
        if (!res.data.addToCart) {
          message.error("Something went wrong");
          return false;
        }
        message.success("Successfully added to cart");

        setColorSelect(1);
      });
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
                  className={classNames(
                    classes.cardDescription,
                    classes.pullRight
                  )}
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
                    <Button
                      plain
                      color="transparent"
                      className={classes.cardDescription}
                    >
                      Shop More
                    </Button>
                  </Link>
                  <Button
                    round
                    color="info"
                    type="submit"
                    onClick={addToCartHandler}
                  >
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

export default compose(
  graphql(addToCartMutation, { name: "addToCartMutation" }),
  graphql(getCartQuery, { name: "getCartQuery" }),
  graphql(getProductQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.match.params.id,
        },
      };
    },
    name: "getProductQuery",
  })
)(ProductPage);
