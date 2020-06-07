import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { Popconfirm, message } from "antd";
import { flowRight as compose } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import GridItem from "components/Grid/GridItem.js";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Button from "components/CustomButtons/Button.js";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import GridContainer from "components/Grid/GridContainer.js";

// gql
import { getCartQuery } from "services/queries.js";
import { updateCartMutation, deleteCartMutation } from "services/mutations.js";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const MenuItem = (props) => {
	const classes = useStyles();
	const [quantity, setQuantity] = useState(props.quantity);
	const [price, setPrice] = useState(props.price);
	const [first, setFirst] = useState(true);

	// console.log(props.total);

	const warning = (w) => {
		message.warning(w);
	};
	const success = (w) => {
		message.success(w);
	};

	props.getTotal(props.total);

	function confirm(e) {
		// console.log(e.currentTarget.value);

		let deleteCartItem = {
			userId: localStorage.getItem("id"),
			itemId: e.currentTarget.value,
		};

		props
			.deleteCartMutation({
				variables: deleteCartItem,
				refetchQueries: [
					{
						query: getCartQuery,
						variables: { id: localStorage.getItem("id") },
					},
				],
			})
			.then((res) => {
				if (res.data.deleteCartItem === null) {
					success("Item successfully removed from cart");
				}
			});
	}

	function cancel(e) {
		console.log(e);
		message.error("Click on No");
	}

	const lessClickHandler = async (e) => {
		console.log(e.currentTarget.value);
		if (quantity <= 1) {
			warning("Quantity should be at least 1 item");
			setQuantity(1);

			return false;
		}
		setQuantity(quantity - 1);
		props.getSub(quantity - 1, price, e.currentTarget.value);

		let cartItem = {
			userId: localStorage.getItem("id"),
			itemId: e.currentTarget.value,
			quantity: quantity - 1,
		};

		props
			.updateCartMutation({
				variables: cartItem,
			})
			.then((res) => {
				if (!res.data.updateCartItem) {
					warning("something went wrong");
					return false;
				}
			});
	};

	const addClickHandler = (e) => {
		// console.log(e.currentTarget.value);
		if (quantity >= 20) {
			warning("You can only order 20 pcs per item");
			setQuantity(20);

			return false;
		}

		setQuantity(quantity + 1);
		props.getSub(quantity + 1, price, e.currentTarget.value);

		let cartItem = {
			userId: localStorage.getItem("id"),
			itemId: e.currentTarget.value,
			quantity: quantity + 1,
		};

		props
			.updateCartMutation({
				variables: cartItem,
			})
			.then((res) => {
				if (!res.data.updateCartItem) {
					warning("something went wrong");
					return false;
				}
			});
	};

	useEffect(() => {
		if (first) {
			setFirst(false);
		}
	});

	return (
		<>
			<Hidden smDown>
				<GridItem xs={3}>
					<img src={props.img} className={classes.imgContainer} />
				</GridItem>
			</Hidden>
			<GridItem xs={5} md={6}>
				<h2 className={classes.title}>
					{`${props.itemName} ${props.categoryName} flavor`.toUpperCase()}
				</h2>

				<p className={classes.description}>₱ {props.price}</p>
			</GridItem>

			<GridItem xs={7} md={3} className={classes.tdNumberAndButtonGroup}>
				<Button
					color="transparent"
					justIcon
					size="sm"
					onClick={lessClickHandler}
					value={props.itemId}
				>
					<RemoveIcon className={classes.icon} />
				</Button>
				<Button color="info" round>
					{quantity}
				</Button>
				<Button
					color="transparent"
					justIcon
					size="sm"
					onClick={addClickHandler}
					value={props.itemId}
				>
					<AddIcon className={classes.icon} />
				</Button>
				<Popconfirm
					title="Are you sure you want to remove this item?"
					onConfirm={confirm}
					onCancel={cancel}
					okText={`Remove ${props.itemName} ${props.categoryName} flavor`.toUpperCase()}
					cancelText="No"
					okButtonProps={{
						type: "primary",
						danger: true,
						value: props.itemId,
					}}
				>
					<Button
						block
						color="danger"
						className={classes.floatRight}
						value={props.itemId}
					>
						Remove from Cart
					</Button>
				</Popconfirm>
			</GridItem>
		</>
	);
};

export default compose(
	graphql(getCartQuery, {
		name: "getCartQuery",
		options: (props) => {
			return {
				variables: { id: localStorage.getItem("id") },
			};
		},
	}),
	graphql(updateCartMutation, { name: "updateCartMutation" }),
	graphql(deleteCartMutation, { name: "deleteCartMutation" })
)(MenuItem);
