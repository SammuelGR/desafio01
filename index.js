const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Primeiro projeto",
    tasks: ["Primeira tarefa"],
  }
];

let counter = 0;

server.use((req, res, next) => {
  counter++;

  next();

  console.log(`Número de requisições: ${counter}`);
}); // counts the number of requisitions

function checkProjectInArray(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
} // checks if project exists

server.get('/projects', (req, res) => {
  return res.json(projects);
}); // lists all projects

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects)
}); // creates new project

server.put('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
}); // updates project title

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  const { id } = req.params;

  const pIndex = projects.findIndex(p => p.id == id);

  projects.splice(pIndex, 1);
  
  return res.send();
}); // deletes project

server.post('/projects/:id/tasks', checkProjectInArray, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const task = title;
  const project = projects.find(p => p.id == id);
  
  project.tasks.push(task);

  return res.json(projects);
}); // creates new task

server.listen(3000);
