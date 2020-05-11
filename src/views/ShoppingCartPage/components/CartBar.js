import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";
import notificationsStyles from "assets/jss/material-kit-pro-react/views/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(notificationsStyles);

export default function SectionNotifications() {
	const classes = useStyles();
	console.log(classes);
	return (
		<SnackbarContent
			message={
				<span>
					<b>DANGER ALERT:</b> You{"'"}ve got some friends nearby,
					stop looking at your phone and find them...
				</span>
			}
			close
			color="danger"
			icon="info_outline"
			className={classes.cartBar}
		/>
	);
}
