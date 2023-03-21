module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],    
    moduleNameMapper: {
    '@/pages/(.*)': '<rootDir>/src/pages/$1',
    '@/styles/(.*)': '<rootDir>/src/styles/$1',
    '@/components/(.*)': '<rootDir>/src/components/$1',
    '@/hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@/services/(.*)': '<rootDir>/src/services/$1',
    '@/constants/(.*)': '<rootDir>/src/constants/$1',
    '@/models/(.*)': '<rootDir>/src/models/$1',
    '@/utils/(.*)': '<rootDir>/src/utils/$1',
    '@/mocks/(.*)': '<rootDir>/src/mocks/$1',
    '@/config/(.*)': '<rootDir>/src/config/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    resetMocks: false,
}