import React from "react";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

// @material-ui icons
import ViewDay from "@material-ui/icons/ViewDay";
import Utensils from "@material-ui/icons/RestaurantMenuOutlined";
import Enjoy from "@material-ui/icons/Favorite";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import descriptionStyle from "assets/jss/material-kit-pro-react/views/presentationSections/descriptionStyle.js";

const useStyles = makeStyles(descriptionStyle);

export default function SectionDescription() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={8} sm={8}>
            <h4 className={classes.description}>
              Since 1999, Beard Papa’s has been baking the world’s best cream
              puffs. We began in Japan and have expanded to over 400 stores in
              15 countries including the Philippines! We are committed to bring
              you a pastry that is super oishii! (delicious!)
            </h4>
          </GridItem>
        </GridContainer>
        <div className={classes.features}>
          <GridContainer>
            <GridItem md={4} sm={4}>
              <InfoArea
                title="Select the Establishment"
                description="Whether you are craving for Boba Girl's Milk Tea or Beard Papa's World Class cream puffs, FJ Primeholdings has got you covered!"
                icon={Utensils}
                iconColor="info"
                vertical={true}
              />
            </GridItem>
            <GridItem md={4} sm={4}>
              <InfoArea
                title="Choose from the Menu"
                description="Check out our special online menu and watch out for promos!"
                icon={ViewDay}
                iconColor="info"
                vertical={true}
              />
            </GridItem>
            <GridItem md={4} sm={4}>
              <InfoArea
                title="Place Your Order and Enjoy"
                description="We will notify you once your orders are ready to be picked up. Enjoy!"
                icon={Enjoy}
                iconColor="info"
                vertical={true}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
