import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import basicsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js";

const useStyles = makeStyles(basicsStyle);
const Quantity = (props) => {
  console.log(props);
  const [simpleSelect, setSimpleSelect] = useState("");
  let productTotal;

  const handleSimple = (event) => {
    console.log(event.target.value);
    setSimpleSelect(event.target.value);

    props.getQuantity(event.target.value);
  };

  const classes = useStyles();

  // productTotal =
  //   props.itemTotal !== "" && typeof props.itemTotal !== typeof NaN
  //     ? ` Total: ₱ ${props.itemTotal}`
  //     : "";

  if (props.itemTotal == "") {
    productTotal = "";
  } else {
    if (!isNaN(props.itemTotal)) {
      productTotal = ` Total: ₱ ${props.itemTotal}`;
    } else {
      productTotal = "";
    }
  }

  console.log(typeof props.itemTotal);

  return (
    <GridContainer>
      <GridItem xs={6} sm={6} md={8}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel htmlFor="quantity" className={classes.selectLabel}>
            Quantity
          </InputLabel>
          <Select
            MenuProps={{
              className: classes.selectMenu,
            }}
            classes={{
              select: classes.select,
            }}
            value={simpleSelect}
            onChange={handleSimple}
            inputProps={{
              name: "simpleSelect",
              id: "quantity",
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem,
              }}
            >
              Select Quantity
            </MenuItem>
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

            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="11"
            >
              11
            </MenuItem>

            <MenuItem
              classes={{
                root: classes.selectMenuItem,
                selected: classes.selectMenuItemSelected,
              }}
              value="12"
            >
              12
            </MenuItem>
          </Select>
        </FormControl>
      </GridItem>

      <GridItem xs={6} sm={6} md={4}>
        <h4 className={classes.title} style={{ textAlign: "center" }}>
          {productTotal}
        </h4>
      </GridItem>
    </GridContainer>
  );
};

export default Quantity;
