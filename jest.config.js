module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'proxy/cliente-http-proxy.service.ts',
    'modules/agregacion/{controllers,services}/**/*.ts',
    'modules/projects/controllers/**/*.ts',
    'modules/project-images/controllers/**/*.ts',
    'modules/solicitudes-contacto/controllers/**/*.ts',
    'common/filters/**/*.ts',
    'common/utils/es-multipart.util.ts',
    '!**/*.spec.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
  coverageReporters: ['text', 'text-summary', 'lcov', 'json-summary'],
};
