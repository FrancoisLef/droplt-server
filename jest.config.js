/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  setupFiles: ['dotenv-flow/config'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
