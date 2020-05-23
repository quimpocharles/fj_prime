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
const Quantity = () => {
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const classes = useStyles();
  return (
    <div id="select">
      <GridContainer>
        <div className={classes.title}>
          <h3>Customizable Select</h3>
        </div>

        <GridItem xs={12} sm={6} md={6} lg={5}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Single Select
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
                id: "simple-select",
              }}
            >
              <MenuItem
                disabled
                classes={{
                  root: classes.selectMenuItem,
                }}
              >
                Single Select
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value="2"
              >
                Paris
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value="3"
              >
                Bucharest
              </MenuItem>
              <MenuItem
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected,
                }}
                value="4"
              >
                Rome
              </MenuItem>
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Quantity;
