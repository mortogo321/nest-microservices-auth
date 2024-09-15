# NestJS Microservices Auth
- NestJS
- PostgeSQL
- RabbitMQ

## Required
- NetsJS CLI: https://docs.nestjs.com/cli/overview  
- dotenv-cli: https://www.prisma.io/docs/orm/more/development-environment/environment-variables/using-multiple-env-files

```bash
yarn global add @nestjs/cli
yarn global add dotenv-cli
```

## Scripts
```bash
# prima migration
 yarn prisma:dev migrate dev --name init
```

## Environment Variables
Global: `.env.{dev | prod}`  
Service: `apps/{service-name}/.env.{dev | prod}`  

## Services
api - http://localhost:8000  
auth - http://localhost:8001  
alert - http://localhost:8002  

## Management Tools
RabbitMQ: http://localhost:15672  
```
u: admin
p: Password@01
```

MailHog: http://localhost:8025  

## Documents
http://localhost:{service-port}/docs  
