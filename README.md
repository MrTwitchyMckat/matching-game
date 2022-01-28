
# Exercise

Welcome! Make sure you read all the instructions carefully before you begin the project. If you have any questions please reach out to your point-of-contact for the hiring process.

The objective of this exercise is to create a Matching Game that highlights your skills in modern frontend web development.

## Matching Game - User Story

- A user is presented with many pairs of randomized hidden values.
- A user will be able to reveal 2 of the hidden values.
- If the values match, they remain visible. If the values do not match, they are returned to their hidden state.
- A user will be able to repeat the process of revealing 2 hidden values until all pairs of values are visible. At this point, the game is over and the user has won.
- A user should be able to see how many attempts have been made to match values.

## Setup

We’ve created the following scaffolding to get a basic project up-and-running with minimal effort.
  
- Clone or download this repo (please do not fork it).
- Install [node.js](https://nodejs.org/en/) and then run npm install in your project directory.
- Once finished, run npm run serve to start a local server through Parcel. Once it's running, a window will open in your default browser with a local URL to access the local server.

> **Note** - You are free to deviate from the initial setup and use your preferred project setup, bundler (e.g. Webpack, Rollup), and dependencies. The only requirement is that running `npm install` from the command line runs all the necessary installation for your project and `npm run serve` starts a local server where your project can be viewed in a browser at `localhost`.

## Requirements

- Utilize modern JavaScript and JavaScript frameworks. Vue is highly encouraged but other frameworks may also be used, e.g. React, Angular, etc.
- Do not use CSS frameworks (e.g. Bootstrap, Foundation). You are encouraged to use pre-processors like SASS or SCSS.
- The initial list of non-randomized values to seed your game can be retrieved from this endpoint in JSON format. You should use the api to retrieve the data.
- The initial state of your project’s design should closely match the mockup (Note: 1 value has been revealed). The design of interactions and additional states are up to you.

> **Note** - If you have any issue retrieving the data from the endpoint, we've included the JSON data locally in `/src/data/data.json`. If you end up using this instead of the API, please explain why in the candidate.md file.

### Bonus Tasks

**You won’t be penalized for skipping the bonus tasks.** Bonus tasks should only be considered if you have fully completed the Requirements and have extra time. A project that only meets the initial Requirements with quality, bug-free code is much stronger than a project that implements bonus tasks at the cost of quality.

- Additional features that put a focus on a good user experience. Such as:
  - Keeping track of the best score across multiple games.
  - Providing the user with a way to restart the game, other than refreshing the browser.
  - Notifying the user in a fun way when they “win” the game.
- Anything that improves the developer experience such as linting/prettify, unit tests, etc.
- Accessibility considerations. Such as:
  - Semantic HTML
  - Aria Tags
  - Keyboard Navigation
  - Color contrast considerations.

## FAQs

### Which browsers should I support?

Your project should be compatible with the latest version of the following browsers:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari

### What colors, fonts, etc. should I use?

Your initial project should look similar to the mockup but It does not have to be pixel-perfect. Just try to get as close as you can, given the resources you have.

### What should I do if I get stuck or run out of time?

That’s OK, sometimes things happen. Complete the exercise to the best of your ability. Feel free to mention any issues or things you’d like the reviews to know in the `candidate.md` file.

## How to Submit

1. Make sure you fill out the `candidate.md` file with any additional information you’d like us to know.

2. Email a zip file (excluding node_modules) with your work or a link to your GitHub repository to your point-of-contact for the hiring process.
