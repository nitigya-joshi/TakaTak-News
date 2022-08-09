import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

let prevPage = "home";

const Navbar = () => {
	const [progress, setProgress] = useState(0);

	const loadingComplete = () => {
		setProgress(100);
	};
	let activeFunc = (pageNow) => {
		setProgress(60);
		// @ts-ignore
		document.getElementById(prevPage).classList.remove("active");
		// @ts-ignore
		document.getElementById(pageNow).classList.add("active");
		prevPage = pageNow;
		console.log(prevPage + pageNow);
		document.title =
			pageNow.charAt(0).toUpperCase() + pageNow.slice(1) + " - TakaTak News";
		setTimeout(loadingComplete, 300);
	};

	return (
		<>
			<LoadingBar
				color="#f11946"
				height={3}
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>
			<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link
						onClick={() => activeFunc("home")}
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
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("home")}
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
									onClick={() => activeFunc("about")}
									id="about"
									className="nav-link"
									to="/about"
								>
									About
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("business")}
									id="business"
									className="nav-link"
									to="/business"
								>
									Business
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("entertainment")}
									id="entertainment"
									className="nav-link"
									to="/entertainment"
								>
									Entertainment
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("health")}
									id="health"
									className="nav-link"
									to="/health"
								>
									Health
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("science")}
									id="science"
									className="nav-link"
									to="/science"
								>
									Science
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("sports")}
									id="sports"
									className="nav-link"
									to="/sports"
								>
									Sports
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => activeFunc("technology")}
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
};

export default Navbar;
