// client/src/components/Projects.tsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import api from '../api';

interface Project {
  id: string;
  name: string;
  description?: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (error: any) {
      setMessage('Failed to fetch projects.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', { name, description });
      setProjects([...projects, res.data]);
      setMessage('Project created!');
      setName('');
      setDescription('');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to create project.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleCreate}>
          <TextField
            label="Project Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Project
          </Button>
        </form>
        {message && <Typography color="error">{message}</Typography>}
      </Paper>
      <Box>
        {projects.map((project) => (
          <Paper key={project.id} sx={{ p: 2, mb: 1 }}>
            <Typography variant="h6">{project.name}</Typography>
            <Typography variant="body2">{project.description}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;
