import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Flavors from "./Flavors";
import Quantity from "./Quantity";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(javascriptStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const ProductDetails = (props) => {
  const [classicModal, setClassicModal] = useState(false);

  console.log(props.categories);

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Button
          block
          round
          onClick={() => setClassicModal(true)}
          color="info"
          className={classes.beardBorder}
        >
          <LibraryBooks />
          Select
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal,
          }}
          open={classicModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setClassicModal(false)}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => setClassicModal(false)}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>{props.name.toUpperCase()}</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <Flavors categories={props.categories} name={props.name} />
            <Quantity />
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button link>Nice Button</Button>
            <Button
              onClick={() => setClassicModal(false)}
              color="danger"
              simple
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>
    </GridContainer>
  );
};

export default ProductDetails;
