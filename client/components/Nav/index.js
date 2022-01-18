import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Nav() {
	function showNav() {
		if (Auth.loggedIn()) {
			return (
				<ul>
					<li>
						<Link to="/myitems">My Items</Link>
					</li>
					<li>
						<a href="/" onClick={() => Auth.logout}>
							Logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			);
		}
	}

	return (
		<header>
			<h1>
				<Link to="/">Sold On Ebay</Link>
			</h1>

			<nav>{showNav()}</nav>
		</header>
	);
}

export default Nav;
