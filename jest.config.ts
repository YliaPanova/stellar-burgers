export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
    '^@pages$': '<rootDir>/src/pages',
    '^@components$': '<rootDir>/src/components',
    '^@utils-types$': '<rootDir>/src/utils/types'
  },
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx']
};
