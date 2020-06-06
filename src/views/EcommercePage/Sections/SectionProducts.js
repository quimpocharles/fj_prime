import React from "react";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui icons
// import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/latestOffersStyle.js";
import pillsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/pillsStyle.js";

// images

// components
import Product from "../components/Product";

const useStyles = makeStyles(pillsStyle);

export default function SectionLatestOffers(props) {
  const classes = useStyles();

  let custardArray = [];
  let cookiesCreamArray = [];
  let hyArray = [];

  if (props.products === "loading...") {
    custardArray = [];
    cookiesCreamArray = [];
    hyArray = [];
  } else {
    props.products.map((product) => {
      if (product.categoryId === "5ec5b8f311a78f03911ae47e") {
        custardArray.push(product);
      } else if (product.categoryId === "5ec5b90411a78f03911ae47f") {
        cookiesCreamArray.push(product);
      } else if (product.categoryId === "5ec5b90f11a78f03911ae480") {
        hyArray.push(product);
      }
    });
  }

  return (
    <div className={classes.section}>
      <GridContainer alignItems="center" justify="center">
        <GridItem xs={12} md={12}>
          <NavPills
            alignCenter
            color="warning"
            tabs={[
              {
                tabButton: "Custard",
                tabContent: (
                  <Product
                    productsArray={custardArray}
                    category="custard flavor"
                    img="assets/img/cus/custard.png"
                  />
                ),
              },
              {
                tabButton: "Cookies and Cream",
                tabContent: (
                  <Product
                    productsArray={cookiesCreamArray}
                    category="Cookies and Cream flavor"
                    img="assets/img/cc/cookie.png"
                  />
                ),
              },
              {
                tabButton: "Honey Yuzu",
                tabContent: (
                  <Product
                    productsArray={hyArray}
                    category="Honey Yuzu flavor"
                    img="assets/img/hy/pie.png"
                  />
                ),
              },
              {
                tabButton: "Others",
                tabContent: "",
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
