// Motivation
// There are a few features of the Gatsby build process that mean the standard
// Jest setup doesn’t quite work. 

// Because Gatsby handles its own Babel configuration, we need to manually tell
// Jest to use babel-jest. This is achieved via this file and the jest.config.ts file

// This file sets up 'babel-jest' with a Babel config and jest.config.ts
// declares the `transform` option, which "points" to this file, and prompts
// that all js or jsx files need to be transformed by this (jest-preprocess.js) file.

// So, this where we set up our Babel config.
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
};

module.exports = require("babel-jest").default.createTransformer(babelOptions);
