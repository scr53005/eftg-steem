module.exports = {
  globals: {
    __DEV__: true
  },
  verbose: true,
  testURL: 'http://localhost/',
  collectCoverage: false,
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.vue',
    '<rootDir>/src/layouts/**/*.vue',
    '<rootDir>/src/pages/**/*.vue',
    '<rootDir>/src/plugins/**/*.js',
    '<rootDir>/src/mixins/**/*.js',
    '<rootDir>/src/directives/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.spec.js'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^quasar$': '<rootDir>/tmp/quasar.common.js',
    '^~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.vue$': '<rootDir>/node_modules/vue-jest',
    '.*\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
