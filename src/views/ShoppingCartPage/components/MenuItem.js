import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Button from "components/CustomButtons/Button.js";

import product1 from "assets/img/jtsLogo.png";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const MenuItem = (props) => {
	const classes = useStyles();

	const addToCart = (e) => {
		e.preventDefault();
		props.getSub(parseInt(e.currentTarget.value));
	};

	return (
		<>
			<ListItem key={1} button>
				<ListItemAvatar>
					<Avatar src={product1} className={classes.large} />
				</ListItemAvatar>
				<Hidden smDown>
					<ListItemText
						primary={
							<h6 className={classes.cardTitle}>
								{props.itemName}
							</h6>
						}
						secondary={`₱ ${props.price}`}
						className={classes.textLeft}
					/>
				</Hidden>
				<Hidden mdUp>
					<ListItemText
						primary={
							<h6 className={classes.cardTitle}>
								{props.itemName}
							</h6>
						}
						secondary={`₱ ${props.price}`}
						className={classes.textLeft}
					/>
				</Hidden>

				<ListItemSecondaryAction>
					<Hidden smDown>
						<Button
							color="danger"
							name={props.itemName}
							value={props.price}
							onClick={addToCart}
						>
							Add To Cart
						</Button>
					</Hidden>

					<Hidden mdUp>
						<Button
							color="danger"
							name={props.itemName}
							value={props.price}
							onClick={addToCart}
						>
							<span value={props.price} onClick={addToCart}>
								+
							</span>
						</Button>
					</Hidden>
				</ListItemSecondaryAction>
			</ListItem>

			<Divider />
		</>
	);
};

export default MenuItem;
