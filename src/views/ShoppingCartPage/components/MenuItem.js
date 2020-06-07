import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import GridItem from "components/Grid/GridItem.js";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const MenuItem = (props) => {
	const classes = useStyles();
	const [quantity, setQuantity] = useState(props.quantity);

	console.log(props);

	return (
		<>
			<Hidden smDown>
				<GridItem xs={3}>
					<img src={props.img} className={classes.imgContainer} />
				</GridItem>
			</Hidden>
			<GridItem xs={8} md={6}>
				<h2 className={classes.tdName}>
					{`${props.itemName} ${props.categoryName} flavor`.toUpperCase()}
				</h2>
				<p className={classes.description}>₱ {props.price}</p>
			</GridItem>

			<GridItem xs={4} md={3} className={classes.tdNumberAndButtonGroup}>
				<Button round size="sm" justIcon color="info">
					<RemoveIcon className={classes.icon} />
				</Button>{" "}
				{quantity}{" "}
				<Button round size="sm" justIcon color="info">
					<AddIcon className={classes.icon} />
				</Button>
			</GridItem>
		</>
	);
};

export default MenuItem;
