import type { AWS } from '@serverless/typescript';

import { swapiStarshipsRoutes, localStarshipsRoutes, starshipRoutes } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'indra-backend',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_HOST: 'indra-backend-mysql.c5cdfue9l95r.us-east-1.rds.amazonaws.com',
      DB_PORT: '3306',
      DB_DATABASE: 'backend_indra',
      DB_USERNAME: 'admin',
      DB_PASSWORD: 'AdminSecret'
    },
  },
  // import the function via paths
  functions: { swapiStarshipsRoutes, localStarshipsRoutes, starshipRoutes },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    documentation: {
      api: {
        info: {
          title: 'Serverless Swappi Clone',
          version: 1.0
        }
      }
    }
  },
};

module.exports = serverlessConfiguration;
