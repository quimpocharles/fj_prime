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
const Flavors = (props) => {
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const handleSimple = (event) => {
    console.log(event.target);
    setSimpleSelect(event.target.value);
  };

  let categoryOptions;

  const classes = useStyles();

  categoryOptions = props.categories.map((category) => {
    return (
      <MenuItem
        classes={{
          root: classes.selectMenuItem,
          selected: classes.selectMenuItemSelected,
        }}
        value={category.price}
        key={category.id}
      >
        {category.name.toUpperCase()}
      </MenuItem>
    );
  });
  return (
    <div id="select">
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <FormControl fullWidth className={classes.selectFormControl}>
            <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
              Flavors
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
                Select Your Flavor
              </MenuItem>

              {categoryOptions}
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default Flavors;
