import React from "react";
// core components
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// library used for cool animations
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

import contentStyle from "assets/jss/material-kit-pro-react/views/presentationSections/contentStyle.js";
// images
import presentationiPad from "assets/img/assets-for-demo/presentationViewSectionComponent/presentation-ipad.png";
import presentationiPadComments from "assets/img/boba_girl.jpg";
import presentationiPadTable from "assets/img/bpapa.jpg";

const useStyles = makeStyles(contentStyle);

export default function SectionContent() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.section, classes.sectionDark)}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem md={4}>
            <div className={classes.sectionDescription}>
              <h3 className={classes.title}>About Us</h3>
              <h6 className={classes.description}>Beard Papa</h6>
              <p className={classes.description}>
                In 1999, a small bakery opened in the small town of Osaka,
                Japan. People in the town couldn’t resist the aroma from the
                bakery, or the kind face of the owner, Yuji Hirota. His fluffy
                white beard was so renowned that he became known as “Beard Papa”
                to all of his regular customers.
              </p>
              <p className={classes.description}>
                He perfected the art of his pastries by making a double layered
                puff–choux on the inside, and pie crust on the outside. Then, he
                proceeded to make the perfect filling, made with a mixture of
                whipped and vanilla custard cream. Beard Papa’s stores still use
                the recipe to this day, along with a ton of new recipes that are
                bound to satisfy any palette. Whether you are in Japan,
                Australia, Canada, or America you will always be able to find
                your own Beard Papa’s.
              </p>
            </div>
          </GridItem>
          <GridItem md={7} className={classes.mlAuto}>
            <div className={classes.imageContainer}>
              <div className={classes.animeAreaImg}>
                <ScrollAnimation animateIn="fadeInUp">
                  <img
                    src={presentationiPadComments}
                    alt="iPad comments"
                    className={classes.areaImg}
                  />
                </ScrollAnimation>
              </div>
              <div className={classes.animeInfoImg}>
                <ScrollAnimation animateIn="fadeInUp">
                  <img
                    src={presentationiPadTable}
                    alt="iPad table"
                    className={classes.infoImg}
                  />
                </ScrollAnimation>
              </div>
              <img
                className={classes.ipadImg}
                src={presentationiPad}
                alt="iPad"
              />
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
