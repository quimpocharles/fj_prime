import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-pro-react/components/headerStyle.js";
const useStyles = makeStyles(styles);

export default function Jt() {
	const classes = useStyles();

	return (
		<GridContainer justify="center">
			<GridItem xs={6}>
				<img
					src={require("assets/img/jtsLogo.png")}
					className={classes.img}
				/>
			</GridItem>
		</GridContainer>
	);
}
