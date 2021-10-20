import React, { Component } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import withMediaQuery from "../media_query";
import { seoTitle, seoDescription, seoPreviewImage } from "constants/seo";
import HorizontalNav from "components/HorizontalNav";

interface ValueProps {
	title: string;
	mediaQuery: boolean;
	getMorePokemons: any;
}

interface ValueState {
	isDeviceMobile: boolean;
}

class HorizontalLayout extends Component<ValueProps, ValueState> {
	constructor(props) {
		super(props);
		this.state = {
			isDeviceMobile: false,
		};

		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		document
			.querySelector("#main-layout")
			.addEventListener("scroll", this.handleScroll);
	}

	componentDidUpdate(prevProps) {
		if (prevProps && this.props) {
			if (this.props.mediaQuery !== prevProps.mediaQuery) {
				this.setState({ isDeviceMobile: this.props.mediaQuery });
			}
		}
	}

	componentWillUnmount() {
		document
			.querySelector("#main-layout")
			.removeEventListener("scroll", this.handleScroll, true);
	}

	handleScroll() {
		const wrappedElement = document.getElementById("main-layout");
		const heightDifference =
			wrappedElement.scrollHeight - wrappedElement.scrollTop;
		if (
			heightDifference === wrappedElement.clientHeight ||
			heightDifference - wrappedElement.clientHeight < 2.5
		) {
			this.props.getMorePokemons();
		}
	}

	render() {
		const { children } = this.props;
		const { isDeviceMobile } = this.state;

		return (
			<div>
				<Head>
					<title>{seoTitle}</title>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta property="og:title" name="og:title" content={seoTitle} />
					<meta
						property="og:description"
						name="og:description"
						content={seoDescription}
					/>
					<meta property="og:image" content={seoPreviewImage} />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
						rel="stylesheet"
					></link>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className={"main-layout"} id="main-layout">
					<div>
						<HorizontalNav isDeviceMobile={isDeviceMobile} />
					</div>

					<div
						className={!isDeviceMobile ? "layout-child" : "layout-child-mobile"}
					>
						{children}
					</div>

					<div
						className={
							!isDeviceMobile ? "layout-footer" : "layout-footer-mobile"
						}
					></div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = ({}) => ({});

export default withMediaQuery("(max-width:1024px)")(
	connect(mapStatetoProps, {})(HorizontalLayout)
);
