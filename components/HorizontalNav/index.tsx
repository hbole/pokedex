import React, { useEffect } from "react";
import { connect } from "react-redux";

import Logo from "../../assets/svg/pokemon-logo.svg";

function HorizontalNav({ isDeviceMobile }) {
	useEffect(() => {});

	return (
		<div className={"horizontal-nav-bar w-100 flex-wrap"}>
			<div>
				{
					<img
						src={Logo}
						height={48}
						width={144}
						style={{ objectFit: "contain" }}
						alt="React Logo"
					/>
				}
			</div>
		</div>
	);
}

const mapStatetoProps = ({ Pokemon }) => ({});

export default connect(mapStatetoProps, {})(HorizontalNav);
