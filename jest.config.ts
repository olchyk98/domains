export default {
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
