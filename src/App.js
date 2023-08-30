import logo from "./logo.svg";
import "./App.css";
import { TestComponent, configure, Login } from "test-component";

let config = {
	UserPoolId: "us-east-1_mdk8mFWNv",
	ClientId: "1liau61478ov95tcd3p3u9j3kt",
	// name: "Saim",
};

function App() {
	console.log("configure", configure);
	configure(config);

	return (
		<div className="App">
			<h2>Code District Package</h2>
			<Login />
			<TestComponent />
		</div>
	);
}

export default App;
