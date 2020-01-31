const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"],
  }
];

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.listen(3000);
