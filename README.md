# Project Name

[![Build Status](https://travis-ci.org/<username>/<repo-name>.svg?branch=master)](https://travis-ci.org/<username>/<repo-name>)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a sample Cypress project for testing web applications. The project uses the latest version of Cypress (x.x.x) and follows the best practices for testing web applications with Cypress. 

## Prerequisites

- [Node.js](https://nodejs.org/en/) v14.17.0 or later
- [NPM](https://www.npmjs.com/) v6.14.13 or later

## Installation

1. Clone the repository: `git clone https://github.com/<username>/<repo-name>.git`
2. Install dependencies: `npm install`

## Usage

- To run all tests: `npm run test`
- To run tests in headless mode: `npm run test:headless`
- To run tests with a specific browser: `npm run test:chrome` or `npm run test:firefox`
- To open Cypress Test Runner: `npm run cypress:open`

## Configuration

The project uses [cypress-dotenv](https://github.com/morficus/cypress-dotenv) for managing environment variables. 

To configure environment variables, create a `.env` file in the root directory of the project and add the variables in the following format:

