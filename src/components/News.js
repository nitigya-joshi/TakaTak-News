import NewsItem from "./NewsItem";
import React, { Component } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteLoader from "./InfiniteLoader";
import pageEnd from "../assets/pageEnd.png";

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

	newsApi = process.env.REACT_APP_NEWS_API;

	fetchMoreData = async () => {
		this.setState({
			loading: true,
			page: this.state.page + 1,
		});
		let apiKey = `https://newsapi.org/v2/top-headlines/?country=${
			this.props.country
		}&category=${this.props.category}&apiKey=${this.newsApi}&pageSize=${
			this.props.pageSize
		}&page=${this.state.page + 1}`;
		let data = await (await fetch(apiKey)).json();
		this.setState({
			articles: this.state.articles.concat(data.articles),
			totalResults: data.totalResults,
			loading: false,
		});
	};

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	async componentDidMount() {
		this.setState({ loading: true });
		let apiKey = `https://newsapi.org/v2/top-headlines/?country=${this.props.country}&category=${this.props.category}&apiKey=${this.newsApi}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
		let data = await (await fetch(apiKey)).json();
		this.setState({
			articles: data.articles,
			totalResults: data.totalResults,
			loading: false,
		});
	}

	render() {
		if (this.state.loading && this.state.articles.length === 0)
			return <Loading />;
		else
			return (
				<>
					<h2 id="heading" className="my-4">
						Top headlines of the day
					</h2>
					<InfiniteScroll
						dataLength={this.state.articles.length}
						next={this.fetchMoreData}
						hasMore={this.state.articles.length < this.state.totalResults}
						loader={<InfiniteLoader />}
						endMessage={
							<div className="text-center">
								<img
									className="my-3"
									src={pageEnd}
									alt="Yay, you have seen it all!"
								/>
							</div>
						}
					>
						<div className="container">
							<div className="row my-5">
								{this.state.articles.map((element, index) => {
									return (
										// @ts-ignore
										<div className="col-md-4 mb-4" key={index}>
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
					</InfiniteScroll>
				</>
			);
	}
}
