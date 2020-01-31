const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "0",
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

  projects[id-1].title = title;

  return res.json(projects);
}); // updates project title

server.listen(3000);
