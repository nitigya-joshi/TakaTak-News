import React, { Component } from "react";

export default class Loading extends Component {
	render() {
		return (
			<div id="loading-wrapper">
				<div id="loading-text">LOADING</div>
				<div id="loading-content"></div>
			</div>
		);
	}
}
