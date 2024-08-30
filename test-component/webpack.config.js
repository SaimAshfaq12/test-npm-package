var path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		path: path.resolve("build"),
		filename: "index.js",
		libraryTarget: "commonjs2",
		publicPath: "/build/"
	},
	resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
          'react-dom': path.resolve(__dirname, './node_modules/react-dom'),  
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: [
				'style-loader', // Creates style nodes from JS strings
				'css-loader',   // Translates CSS into CommonJS
				'sass-loader'   // Compiles Sass to CSS
				],
			}
		],
	},
	// externals: {
	// 	react: path.resolve(__dirname, "..", "node_modules", "react"),
	// },
	externals: {      
        // Don't bundle react or react-dom      
        react: {          
            commonjs: "react",          
            commonjs2: "react",          
            amd: "React",          
            root: "React"      
        },      
        "react-dom": {          
            commonjs: "react-dom",          
            commonjs2: "react-dom",          
            amd: "ReactDOM",          
            root: "ReactDOM"      
        }  
    } 
};

// const path = require("path");

// module.exports = {
// 	mode: "development",
// 	entry: {
// 		bundle: ["./src/index.js"],
// 	},
// 	devtool: "eval-source-map",
// 	output: {
// 		filename: "[name].js",
// 	},
// 	resolve: {
// 		extensions: [".js", ".jsx", ".ts", ".tsx"],
// 	},
// 	devServer: {
// 		static: {
// 			directory: path.join(__dirname, "example"),
// 		},
// 	},
// 	module: {
// 		rules: [
// 			{ test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
// 			{ test: /\.ts|.tsx$/, exclude: /node_modules/, use: ["ts-loader"] },
// 		],
// 	},
// };
