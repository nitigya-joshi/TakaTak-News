import NewsItem from "./NewsItem";
import React, { Component } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
	static propTypes = {
		pageSize: PropTypes.number.isRequired,
		country: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	};

	static defaultProps = {
		pageSize: 21,
		country: "in",
		category: "general",
	};

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			totalResults: 0,
			loading: false,
			page: 1,
		};
		document.title =
			this.capitalizeFirstLetter(this.props.category) + " - TakaTak News";
	}

	fetchMoreData = async () => {
		console.log("fetch more data ka loading start");
		this.setState({ loading: true });
		let apiKey = `https://newsapi.org/v2/top-headlines/?country=${this.props.country}&category=${this.props.category}&apiKey=7e87c89bfbbd4b8b8bb0721d45a6d454&pageSize=${this.props.pageSize}&page=${this.state.page}`;
		let data = await (await fetch(apiKey)).json();
		this.setState({
			page: this.state.page + 1,
			articles: this.state.articles.concat(data.articles),
			totalResults: data.totalResults,
			loading: false,
		});
		console.log("fetch more data ka loading khatam");
	};

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async componentDidMount() {
		console.log("componenet did mount ka loading start");
		this.setState({ loading: true, page: this.state.page + 1 });
		let apiKey = `https://newsapi.org/v2/top-headlines/?country=${this.props.country}&category=${this.props.category}&apiKey=7e87c89bfbbd4b8b8bb0721d45a6d454&pageSize=${this.props.pageSize}&page=${this.state.page}`;
		let data = await (await fetch(apiKey)).json();
		this.setState({
			page: this.state.page + 1,
			articles: data.articles,
			totalResults: data.totalResults,
			loading: false,
		});
		console.log("componenet did mount ka loading khatam");
	}

	render() {
		return (
			<>
				<h2 id="heading" className="my-4">
					Top headlines of the day
				</h2>
				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length < this.state.totalResults}
					loader={<Loading />}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					<>
						{console.log(`${this.state.articles.length} + ${this.state.page}`)}
						<div className="container">
							<div className="row my-5">
								{this.state.articles.map((element) => {
									return (
										// @ts-ignore
										<div className="col-md-4 mb-4" key={element.url}>
											<NewsItem
												// @ts-ignore
												title={element.title}
												// @ts-ignore
												description={element.description}
												// @ts-ignore
												imageUrl={element.urlToImage}
												// @ts-ignore
												more={element.url}
												// @ts-ignore
												author={element.author}
												// @ts-ignore
												publishedAt={element.publishedAt}
												// @ts-ignore
												source={element.source.name}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</>
				</InfiniteScroll>
			</>
		);
	}
}
