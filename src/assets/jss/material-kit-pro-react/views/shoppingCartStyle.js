import {
  container,
  title,
  cardTitle,
  main,
  mainRaised,
  mrAuto,
  whiteColor,
  grayColor,
  mlAuto,
  section,
} from "assets/jss/material-kit-pro-react.js";

import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";
import tooltips from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const styles = (theme) => ({
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  section,
  cardTitle,
  ...buttonGroup,
  ...tooltips,
  container: {
    ...container,
    zIndex: 1,
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
  },
  title: {
    ...title,
    fontSize: "1.5em",
    "&, & + h4": {
      color: grayColor[1],
    },
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  icon: {
    width: "18px",
    height: "18px",
    top: "3px",
    position: "relative",
    zIndex: "-100",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%",
    },
  },
  description: {
    maxWidth: "150px",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em",
  },
  tdNameAnchor: {
    color: grayColor[1],
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300",
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "150px",
    fontWeight: "300",
    fontSize: "1.125em !important",
  },
  tdNumberSmall: {
    marginRight: "3px",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
    textAlign: "center",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0",
    },
  },
  customFont: {
    fontSize: "16px !important",
  },
  actionButton: {
    margin: "0px",
    padding: "5px",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
    marginLeft: "1.25em",
    [theme.breakpoints.up("md")]: {
      marginLeft: "50px",
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
});

export default styles;
