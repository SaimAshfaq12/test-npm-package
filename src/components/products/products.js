import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function Products() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const apiGatewayUrl =
		"https://mh2guoi85b.execute-api.us-east-1.amazonaws.com/dev";

	let idToken = Cookies.get("doorman_user");

	console.log("Token from Cookie", idToken);

	useEffect(() => {
		// const apiUrl = "http://localhost:3000/products"; // Change the port if needed

		const response = axios
			.get(`${apiGatewayUrl}/products`, {
				// .get("https://86f2-175-107-239-31.ngrok-free.app/products", {
				headers: {
					Authorization: `Bearer ${idToken}`,
					"ngrok-skip-browser-warning": "any",
				},
			})
			.then((response) => {
				setProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching data:");
				console.log(error);
				setLoading(false); // Set loading to false even in case of an error
			});
	}, []);
	return (
		<div>
			<h1>Product List</h1>
			{loading ? (
				<p>Loading...</p>
			) : (
				<ul>
					{products.map((product) => (
						<li key={product.id}>
							{product.name} - ${product.price}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Products;
