import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Auth from "../../utils/auth";

function Nav() {
	function showNav() {
		if (Auth.loggedIn()) {
			return (
				<ul>
					<li>
						<NavLink to="/profile">My Profile</NavLink>
					</li>
					<li>
						<a href="/" onClick={() => Auth.logout()}>
							Logout
						</a>
					</li>
				</ul>
			);
		} else {
			return (
				<ul>
					<li>
						<NavLink className={(navData) => navData.isActive ? "navActive" : ""} to="/signup">Signup</NavLink>
					</li>
					<li>
						<NavLink className={(navData) => navData.isActive ? "navActive" : ""} to="/login">Login</NavLink>
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
