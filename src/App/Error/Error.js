import { Paper } from '@material-ui/core';
import React, { Component } from 'react';
import { firebaseFirestore } from '../../imports';
class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
		// You can also log error messages to an error reporting service here
		firebaseFirestore.collection('error-reporting').add({
			error: this.state.error.toString(),
			errorInfo: this.state.errorInfo.componentStack,
		});
	}

	render() {
		if (this.state.errorInfo) {
			// Error path
			return (
				<div
					style={{
						backgroundColor: '#a59898',
					}}
				>
					<Paper>
						<h2>Something went wrong.</h2>
						<details style={{ whiteSpace: 'pre-wrap' }}>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</Paper>
				</div>
			);
		}
		// Normally, just render children
		return this.props.children;
	}
}

export default ErrorBoundary;
