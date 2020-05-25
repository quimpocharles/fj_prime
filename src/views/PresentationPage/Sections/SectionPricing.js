import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import pricingStyle from "assets/jss/material-kit-pro-react/views/presentationSections/pricingStyle.js";

const useStyles = makeStyles(pricingStyle);

export default function SectionPricing() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            md={8}
            sm={10}
            className={classNames(classes.mlAuto, classes.mrAuto)}
          >
            <h2 className={classes.title}>
              Ready to enjoy your favorites at home?
            </h2>
          </GridItem>
          <GridItem
            md={8}
            sm={10}
            className={classNames(classes.mlAuto, classes.mrAuto)}
          >
            <p className={classes.description}>
              No need to call via phone. Simply select a food establishment,
              pick from the menu, wait for the confirmation, and enjoy your
              order!
            </p>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
