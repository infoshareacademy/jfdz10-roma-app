import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	title: {
		width: "100%",
		padding: "1rem 2rem"
	}
});

class CompleteOrderPage extends Component {
	state = {};
	render() {
		const { classes } = this.props;
		return (
			<Container className="h-100" style={{ position: "relative" }}>
				<Row className="h-100">
					<h3 className={classes.title}>Wybrana pizza:</h3>
				</Row>
			</Container>
		);
	}
}

export default withStyles(styles)(CompleteOrderPage);
