/**
 * Jest configuration for unit tests
 * @see https://jestjs.io/docs/configuration
 */
module.exports = {
  rootDir: './src',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testTimeout: 10000,
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': ['<rootDir>/$1'],
  },
}
