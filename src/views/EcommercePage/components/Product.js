import React, { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Layers from "@material-ui/icons/Layers";
import { Link } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.js";

const useStyles = makeStyles(featuresStyle);

const Product = ({ ...rest }) => {
  const classes = useStyles();
  const [image, setImage] = useState(rest.img);
  const [desc, setDesc] = useState(rest.category);
  let colorCircles;

  let productData;

  if (rest.productsArray === []) {
    productData = "loading...";
  } else {
    productData = rest.productsArray
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((product) => {
        console.log(product);

        return (
          <GridItem xs={6} md={4}>
            <Link to={`/menu/${product.id}`}>
              <Card profile plain>
                <CardAvatar
                  profile
                  plain
                  style={{
                    backgroundImage: `url('${product.image_location}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "#e6c286",
                    height: "75px",
                    width: "75px",
                  }}
                ></CardAvatar>
                <CardBody plain>
                  <h4>{product.name.toUpperCase()}</h4>
                </CardBody>
              </Card>
            </Link>
          </GridItem>
        );
      });
  }

  return (
    <div className="cd-section" {...rest}>
      {/* Feature 3 START */}
      <div className={classes.features3}>
        <GridContainer alignItems="center">
          <GridItem xs={12} sm={6} md={6}>
            <div className={classes.phoneContainer}>
              <img src={image} />
              <h6 className={classes.description}>{desc}</h6>
            </div>
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <h2 className={classes.title}>Select Shell</h2>
            <GridContainer>{productData}</GridContainer>
          </GridItem>
        </GridContainer>
      </div>
      {/* Feature 3 END */}
    </div>
  );
};

export default Product;
