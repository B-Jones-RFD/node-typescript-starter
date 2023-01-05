# node-typescript-starter

Node Typescript Boilerplate

## Getting Started

### Dependencies

- Add remote dependencies

### Installing

1. Install Node.js

   ```console
   brew install node
   ```

   OR <https://nodejs.org/en/>

2. Clone Repository

   ```console
   git clone https://github.com/B-Jones-RFD/node-typescript-starter.git
   ```

3. Install node dependencies

   ```console
   npm install
   ```

4. Add environment dependencies

   ```console
   touch .env
   ```

### Prerequisites

- Node.js
- NPM
- Git

## Testing

### Jest

For lower level tests of utilities and individual components, we use `jest` and `supertest`. See https://jestjs.io/ and https://github.com/ladjs/supertest#readme for documentation. To run tests `npm run test` or `npm run test: watch` to run in watch mode.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

## Docker Development and Deployment

Add steps

## Help

Contact [Author 1](mailto:author1@anyisp.com)

## Authors

- [Author 1](mailto:author1@anyisp.com)

## Version History

- 1.0
  - Initial Release
