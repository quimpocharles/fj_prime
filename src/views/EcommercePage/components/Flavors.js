import React, { useState, useEffect } from "react";
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
  const [simpleSelect, setSimpleSelect] = useState("");
  const [price, setPrice] = useState("");
  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
    setPrice(event.currentTarget.getAttribute("data-price"));
    props.getPrice(event.currentTarget.getAttribute("data-price"));
    props.getCategoryId(event.target.value);
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
        data-price={category.price}
        value={category.id}
        key={category.id}
      >
        {category.name.toUpperCase()}
      </MenuItem>
    );
  });

  useEffect(() => {
    // console.log(simpleSelect);
    // console.log("value of price " + price);
  });
  return (
    <GridContainer>
      <GridItem xs={8} sm={8} md={8}>
        <FormControl fullWidth className={classes.selectFormControl}>
          <InputLabel htmlFor="simple-select" className={classes.selectLabel}>
            Choose a Filling
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
              name: "category",
              id: "simple-select",
            }}
          >
            <MenuItem
              disabled
              classes={{
                root: classes.selectMenuItem,
              }}
            >
              Choose a Filling
            </MenuItem>

            {categoryOptions}
          </Select>
        </FormControl>
      </GridItem>
      <GridItem xs={4} sm={4} md={4}>
        <h4 className={classes.title} style={{ textAlign: "center" }}>
          {" "}
          ₱ {price} / item
        </h4>
      </GridItem>
    </GridContainer>
  );
};

export default Flavors;
