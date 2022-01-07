/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/bootstrap.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
