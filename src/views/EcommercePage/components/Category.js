import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import color1 from "assets/img/jtsManok.jpg";

import { Link } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
const useStyles = makeStyles(styles);
const Category = (props) => {
  console.log(props);

  const categoryClickHandler = (e) => {
    // e.preventDefault();
    // console.log(e.currentTarget.value);
  };

  const classes = useStyles();
  return (
    <GridItem xs={12} sm={4} md={4}>
      <Card blog>
        <CardHeader image>
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img src={color1} alt="..." />
          </a>
          <div
            className={classes.coloredShadow}
            style={{
              backgroundImage: `url(${color1})`,
              opacity: "1",
            }}
          />
        </CardHeader>
        <CardBody>
          <h6 className={classes.cardCategory}>{props.category}</h6>

          <h4 className={classes.cardTitle}>
            <Link to={"/menu/" + props.id}>
              <Button
                color="danger"
                block
                round
                className={classes.subscribeButton}
                value={props.id}
                onClick={categoryClickHandler}
              >
                SELECT
              </Button>
            </Link>
          </h4>
        </CardBody>
      </Card>
    </GridItem>
  );
};
export default Category;
