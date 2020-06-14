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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// gql
import { getCartQuery } from "services/queries.js";
import { updateCartMutation, deleteCartMutation } from "services/mutations.js";

import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.js";
const useStyles = makeStyles(shoppingCartStyle);

const Menu = (props) => {
	const classes = useStyles();
	const [quantity, setQuantity] = useState(props.quantity);
	const [price, setPrice] = useState(props.price);
	const [first, setFirst] = useState(true);
	const [cartTotal, setCartTotal] = useState(props.total);

	// console.log(props.total);

	const warning = (w) => {
		message.warning(w);
	};
	const success = (w) => {
		message.success(w);
	};

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

	// const lessClickHandler = async (e) => {
	// 	console.log(e.currentTarget.value);
	// 	if (quantity <= 1) {
	// 		warning("Quantity should be at least 1 item");
	// 		setQuantity(1);

	// 		return false;
	// 	}
	// 	setQuantity(quantity - 1);
	// 	props.getSub(quantity - 1, price, e.currentTarget.value);

	// 	let cartItem = {
	// 		userId: localStorage.getItem("id"),
	// 		itemId: e.currentTarget.value,
	// 		quantity: quantity - 1,
	// 	};

	// 	props
	// 		.updateCartMutation({
	// 			variables: cartItem,
	// 			refetchQueries: [
	// 				{
	// 					query: getCartQuery,
	// 					variables: { id: localStorage.getItem("id") },
	// 				},
	// 			],
	// 		})
	// 		.then((res) => {
	// 			if (!res.data.updateCartItem) {
	// 				warning("something went wrong");
	// 				return false;
	// 			}
	// 			props.getCartQuery.refetch();
	// 		});
	// };

	// const addClickHandler = (e) => {
	// 	// console.log(e.currentTarget.value);
	// 	if (quantity >= 20) {
	// 		warning("You can only order 20 pcs per item");
	// 		setQuantity(20);

	// 		return false;
	// 	}

	// 	setQuantity(quantity + 1);
	// 	props.getSub(quantity + 1, price, e.currentTarget.value);

	// 	let cartItem = {
	// 		userId: localStorage.getItem("id"),
	// 		itemId: e.currentTarget.value,
	// 		quantity: quantity + 1,
	// 	};

	// props
	// 	.updateCartMutation({
	// 		variables: cartItem,
	// 		refetchQueries: [
	// 			{
	// 				query: getCartQuery,
	// 				variables: { id: localStorage.getItem("id") },
	// 			},
	// 		],
	// 	})
	// 	.then((res) => {
	// 		if (!res.data.updateCartItem) {
	// 			warning("something went wrong");
	// 			return false;
	// 		}
	// 		props.getCartQuery.refetch();
	// 	});
	// };

	const getTotalHandler = (e) => {
		setQuantity(e.target.value);
		let cartItem = {
			userId: localStorage.getItem("id"),
			itemId: e.target.name,
			quantity: parseInt(e.target.value),
		};

		props
			.updateCartMutation({
				variables: cartItem,
				refetchQueries: [
					{
						query: getCartQuery,
						variables: { id: localStorage.getItem("id") },
					},
				],
			})
			.then((res) => {
				if (!res.data.updateCartItem) {
					warning("something went wrong");
					return false;
				}
				props.getSub(quantity, price, e.target.name);
				props.getCartQuery.refetch();
			});

		// console.log(e.target);
	};

	useEffect(() => {
		if (first) {
			setFirst(false);
		}
	});
	props.getTotal(props.total);

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
				<FormControl fullWidth className={classes.selectFormControl}>
					<Select
						MenuProps={{
							className: classes.selectMenu,
						}}
						classes={{
							select: classes.select,
						}}
						value={quantity}
						onChange={getTotalHandler}
						inputProps={{
							name: props.itemId,
							id: "color-select",
						}}
					>
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
							value="3"
						>
							3
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
						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="13"
						>
							13
						</MenuItem>

						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="14"
						>
							14
						</MenuItem>
						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="15"
						>
							15
						</MenuItem>
						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="16"
						>
							16
						</MenuItem>

						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="17"
						>
							17
						</MenuItem>

						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="18"
						>
							18
						</MenuItem>
						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="19"
						>
							19
						</MenuItem>
						<MenuItem
							classes={{
								root: classes.selectMenuItem,
								selected: classes.selectMenuItemSelected,
							}}
							value="20"
						>
							20
						</MenuItem>
					</Select>
				</FormControl>
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
)(Menu);
