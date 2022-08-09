import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={
						<News key="gen" pageSize={6} country="in" category="general" />
					}
				/>
				<Route path="/about" element={<About />} />
				<Route
					path="/business"
					element={
						<News key="busi" pageSize={6} country="in" category="business" />
					}
				/>
				<Route
					path="/entertainment"
					element={
						<News
							key="enter"
							pageSize={6}
							country="in"
							category="entertainment"
						/>
					}
				/>
				<Route
					path="/health"
					element={
						<News key="heal" pageSize={6} country="in" category="health" />
					}
				/>
				<Route
					path="/science"
					element={
						<News key="sci" pageSize={6} country="in" category="science" />
					}
				/>
				<Route
					path="/sports"
					element={
						<News key="spo" pageSize={6} country="in" category="sports" />
					}
				/>
				<Route
					path="/technology"
					element={
						<News key="tech" pageSize={6} country="in" category="technology" />
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
