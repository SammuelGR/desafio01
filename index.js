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

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
}); // updates project title

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const pIndex = projects.findIndex(p => p.id == id);

  projects.splice(pIndex, 1);
  
  return res.send();
}); // deletes project

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const task = title;
  const project = projects.find(p => p.id == id);
  
  project.tasks.push(task);

  return res.json(projects);
}); // creates new task

server.listen(3000);
