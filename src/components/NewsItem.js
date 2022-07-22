import React, { Component } from "react";

export default class NewsItem extends Component {
	render() {
		let {
			title,
			description,
			imageUrl,
			more,
			author,
			publishedAt,
			source,
		} = this.props;
		const date = new Date(publishedAt).toLocaleDateString("en-GB");
		const time = new Date(publishedAt).toLocaleTimeString();

		return (
			<div className="card">
				<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
					{source}
				</span>
				<img
					src={
						imageUrl
							? imageUrl
							: "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="
					}
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{title}...</h5>
					<p className="card-text">{description}...</p>
					<hr />
					<p className="card-text">
						<small className="text-muted">
							Publisher: {author ? author : "Unknown"} | {date} - {time}
						</small>
					</p>
					<a
						href={more}
						className="btn btn-sm btn-primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read More
					</a>
				</div>
			</div>
		);
	}
}
