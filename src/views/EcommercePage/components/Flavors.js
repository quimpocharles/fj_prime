import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// relative imports
import { getCategoriesQuery } from "services/queries";

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

  console.log(props);

  let categoryOptions;

  const classes = useStyles();

  // if (props.data.loading) {
  //   categoryOptions = "loading...";
  // } else {
  //   categoryOptions = props.data.getCategories.map((category) => {
  //     return (
  //       <MenuItem
  //         classes={{
  //           root: classes.selectMenuItem,
  //           selected: classes.selectMenuItemSelected,
  //         }}
  //         data-price={5}
  //         value={category.id}
  //         key={category.id}
  //       >
  //         {category.name.toUpperCase()}
  //       </MenuItem>
  //     );
  //   });
  // }

  categoryOptions = (
    <MenuItem
      classes={{
        root: classes.selectMenuItem,
        selected: classes.selectMenuItemSelected,
      }}
      data-price={5}
      value="hello"
      key="hello1"
    >
      name
    </MenuItem>
  );

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

export default graphql(getCategoriesQuery)(Flavors);
