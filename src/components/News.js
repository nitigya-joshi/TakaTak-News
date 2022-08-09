import NewsItem from "./NewsItem";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteLoader from "./InfiniteLoader";
import pageEnd from "../assets/pageEnd.png";

const News = (props) => {
	const [articles, setArticles] = useState([]);
	const [totalResults, setTotalResults] = useState(0);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const newsApi = process.env.REACT_APP_NEWS_API;

	const fetchMoreData = async () => {
		setLoading(true);
		setPage(page + 1);

		let apiKey = `https://newsapi.org/v2/top-headlines/?country=${
			props.country
		}&category=${props.category}&apiKey=${newsApi}&pageSize=${
			props.pageSize
		}&page=${page + 1}`;
		let data = await (await fetch(apiKey)).json();

		setArticles(articles.concat(data.articles));
		setTotalResults(data.totalResults);
		setLoading(false);
	};

	useEffect(() => {
		(async () => {
			setLoading(true);
			let apiKey = `https://newsapi.org/v2/top-headlines/?country=${props.country}&category=${props.category}&apiKey=${newsApi}&pageSize=${props.pageSize}&page=${page}`;
			let data = await (await fetch(apiKey)).json();
			setArticles(data.articles);
			setTotalResults(data.totalResults);
			setLoading(false);
		})();

		return () => {};
	}, []);

	if (loading && articles.length === 0) return <Loading />;
	else
		return (
			<>
				<h2 id="heading" style={{ marginTop: "80px" }}>
					Top headlines of the day
				</h2>
				<InfiniteScroll
					dataLength={articles.length}
					next={fetchMoreData}
					hasMore={articles.length < totalResults}
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
							{articles.map((element, index) => {
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
};

News.propTypes = {
	pageSize: PropTypes.number.isRequired,
	country: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
};

News.defaultProps = {
	pageSize: 21,
	country: "in",
	category: "general",
};

export default News;
