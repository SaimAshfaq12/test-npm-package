import React from "react";
import "./styles.css";
import { configure } from "./config/awsConfig";
import { Login } from "./features/login/login.jsx";

export const HelloWorld = () => {
	return <div>Hello HelloWorld</div>;
};

export const TestComponent = () => {
	return <div className="styled-component">{"Testingggg!!"}</div>;
};

export { configure, Login };
