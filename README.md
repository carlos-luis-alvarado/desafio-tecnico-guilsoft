<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


#  Usage/Examples 
## Login (Metodo Post)
```javascript
Route : http://localhost:3000/auth/login
```
### Campos para login
```javascript
data = {
  "email":"email@email.com",
  "password":"123456789"
}
```
### Respuesta
```javascript
{
    "acces_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1aXNAbHVpcy5jb20iLCJpYXQiOjE3MTE5OTk4MzMsImV4cCI6MTcxMjAwMDczM30.bFcwlp7zxvPYXUavw1FUe6AeR7T1tJgZIAa0ABPJwak",
    "email": "email@email.com"
}
```
## Registrar usuario (Method Post)
```javascript
Route : http://localhost:3000/auth/register
```
### Campos para registrar usuario
```javascript
{
    "name":"user",
    "email":"email@email.com",
    "password":"123456789"
}
```
### Respuesta
```javascript
{
  "name": "luis",
  "email": "admin@admin.com",
}
```
## Verificar usuario logeado - token valido 15 min (Method Get)
```javascript
Route : http://localhost:3000/users/user
```
### Response
```javascript
{
    "message": "User connect",
    "email": "email@email.com"
}
```
## Crear tarea (Metodo Post)
```javascript
Route : http://localhost:3000/users/user/create-task
```
### Campos para crear una tarea
```javascript
{
    "title": "Titulo de la tarea",
    "description": "Descrpcion de la tarea",
    "state": "Estado de la tarea"
}
```
### Response
```javascript
{
    "tasks": [
        {
            "_id": "660b026d82a3a6f767bec776",
            "title": "Titulo de la tarea",
            "description": "Descripcion de la tarea",
            "state": "Estado de la tarea",
            "updated_at": "2024-04-01T18:52:29.164Z",
            "created_at": "2024-04-01T18:52:29.164Z",
        }
    ],
    "email": "email@email.com"
}
```
## Obtener tarea por id (Metodo get)
```javascript
Route : http://localhost:3000/users/user/task/:idTarea
```
### Response
```javascript
{
    "task": {
        "_id": "660b026d82a3a6f767bec776",
        "title": "Titulo de la tarea",
        "description": "Descripcion de la tarea",
        "state": "Estado de la tarea",
        "updated_at": "2024-04-01T21:05:21.193Z",
        "created_at": "2024-04-01T21:05:21.193Z",
    },
    "user": "email@email.com"
}
```
## Borrar tarea por id (Metodo delete)
```javascript
Route :http://localhost:3000/users/user/delete-task/idTarea
```
### Respuesta
```javascript
{
    "task": {
        "_id": "660b219124f8f74aad5305ff",
        "title": "Titulo de la tarea",
        "description": "Descripcion de la tarea",
        "state": "Estado de la tarea",
        "user": "660b019e82a3a6f767bec771",
        "updated_at": "2024-04-01T21:05:21.193Z",
        "created_at": "2024-04-01T21:05:21.193Z",
        "__v": 0
    },
    "user": "luis@luis.com"
}
```
## Editar tarea (Metodo put)
```javascript
Route : http://localhost:3000/users/user/update-task/:idTarea
```
### Campos para editar una tarea
```javascript
{
    "title": "Titulo de la tarea",
    "description": "Descrpcion de la tarea",
    "state": "Estado de la tarea"
}
```
### Respuesta
```javascript
{
    "taskUpdated": {
        "_id": "660b1f42a773786d4432bee6",
        "title": "Titulo de la tarea actualizado",
        "description": "Descripcion de la tarea",
        "state": "estado",
        "user": "660b019e82a3a6f767bec771",
        "updated_at": "2024-04-01T21:43:27.414Z",
        "created_at": "2024-04-01T20:55:30.521Z",
        "__v": 0
    },
    "email": "email@email.com"
}
```
## Obtener todas las tareas (Metodo get)
```javascript
Route : http://localhost:3000/users/user/tasks/
```
### Respuesta
```javascript
{
    "tasks": [
        {
            "_id": "660b026d82a3a6f767bec776",
            "title": "Titulo de la tarea",
            "description": "Descripcion de la tarea",
            "state": "Estado de la tarea",
            "updated_at": "2024-04-01T18:52:29.164Z",
            "created_at": "2024-04-01T18:52:29.164Z",
            "__v": 0
        }
    ]
}
```