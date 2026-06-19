# API Documentation

## Authentication

POST /api/auth/register

Request:
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "123456"
}

POST /api/auth/login

Request:
{
  "email": "john@gmail.com",
  "password": "123456"
}

## Projects

GET /api/projects

POST /api/projects

{
  "projectName": "TaskFlow",
  "description": "Project Management System",
  "status": "Not Started"
}

PUT /api/projects/:id

DELETE /api/projects/:id

## Tasks

GET /api/tasks

POST /api/tasks

{
  "taskName": "Assignment",
  "description": "Complete project",
  "priority": "Medium",
  "status": "Pending",
  "projectId": "project_id"
}

PUT /api/tasks/:id

DELETE /api/tasks/:id