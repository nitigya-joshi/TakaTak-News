import React, { Component } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class Navbar extends Component {
	state = {
		progress: 0,
	};

	loadingComplete = () => {
		this.setState({ progress: 100 });
	};

	prevPage = "home";
	activeFunc = (pageNow) => {
		this.setState({ progress: 60 });
		// @ts-ignore
		document.getElementById(this.prevPage).classList.remove("active");
		// @ts-ignore
		document.getElementById(pageNow).classList.add("active");
		this.prevPage = pageNow;
		setTimeout(this.loadingComplete, 300);
	};

	render() {
		return (
			<>
				<LoadingBar
					color="#f11946"
					height={3}
					progress={this.state.progress}
					onLoaderFinished={() => this.setState({ progress: 0 })}
				/>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<div className="container-fluid">
						<Link
							onClick={() => this.activeFunc("home")}
							className="navbar-brand"
							to="/"
						>
							TakaTak News
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("home")}
										id="home"
										className="nav-link active"
										aria-current="page"
										to="/"
									>
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("about")}
										id="about"
										className="nav-link"
										to="/about"
									>
										About
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("business")}
										id="business"
										className="nav-link"
										to="/business"
									>
										Business
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("entertainment")}
										id="entertainment"
										className="nav-link"
										to="/entertainment"
									>
										Entertainment
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("health")}
										id="health"
										className="nav-link"
										to="/health"
									>
										Health
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("science")}
										id="science"
										className="nav-link"
										to="/science"
									>
										Science
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("sports")}
										id="sports"
										className="nav-link"
										to="/sports"
									>
										Sports
									</Link>
								</li>
								<li className="nav-item">
									<Link
										onClick={() => this.activeFunc("technology")}
										id="technology"
										className="nav-link"
										to="/technology"
									>
										Technology
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

export default Navbar;
