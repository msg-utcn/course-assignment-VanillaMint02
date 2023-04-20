# Week 4

## Setting Up 

- Clone this week (branch: `week-4`) onto your computer and overwrite the code used in your personal repository (or follow the recordings and do the changes yourself)
  - Take care to not overwrite the hidden `.git` folder
- Run `npm install` inside the cloned folder
- Go to `docker` folder and run a `docker-compose up -d` to start the database

## Reading

- [TypeORM Repository](https://docs.nestjs.com/techniques/database#repository-pattern)
- [OpenAPI Types and Parameters](https://docs.nestjs.com/openapi/types-and-parameters)
- [NestJs Providers](https://docs.nestjs.com/providers)
- [Bcrypt Hashing](https://docs.nestjs.com/security/encryption-and-hashing#hashing)

## Assignment

- Create a new folder under `apps/api/app/` called `users`
- Create a new module `users.module`
- Create a new Model for a User and a new enum for User roles
```typescript
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export class UserModel {
  id?: string;
  name: string;
  email: string;
  roles: UserRole[];
}
```
- Annotate the model with TypeOrm Annotations
- Create some DTO's for
```typescript
export class RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

export class UserDto {
  id?: string;
  name: string;
  email: string;
  roles: UserRole[];
}
```
- Annotate and describe the DTO's with OpenAPI annotations (description, examples)
- Create a service for users as a file `users.service` it will have the following methods
  - registerUser 
    - install bcrypt by running `npm install bcrypt` in the root directory
    - use `bcrypt.hash(password, saltOrRounds)` where `saltOrRounds` is a random number
    - replace the `RegisterUserDto.password` with the resulted hashed password
    - save the user in the vault
  - getUserById
  - getUserByEmail
  - getUsers
- Create a controller for users as a file `users.controller` with the following endpoints
  - getUserById
  - getUsers
  - registerUser
- Annotate the Controller service with `@Controller` and `@ApiTags`
- Make sure to import the `UsersController` and provide the `UsersService` in the `UsersModule`
- Make sure to import the `TypeOrmModule.forFeature([UserModel])` inside the `UsersModule`
- Make sure to import the `UsersModule` inside the `AppModule`
- Add inside the `main.ts` the new OpenAPI tag for the Users feature
- Start the application and test your functionality
- Create a PR and add me as a reviewer
