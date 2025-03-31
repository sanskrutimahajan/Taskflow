// client/src/components/Tasks.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import api from '../api';
import { useSocket } from '../Contexts/SocketContexts';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in progress' | 'completed';
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('pending');
  const [message, setMessage] = useState('');
  const socket = useSocket();

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error: any) {
      setMessage('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Listen for real-time task updates
  useEffect(() => {
    if (!socket) return;

    const handleTaskUpdated = (newTask: Task) => {
      // Option: Append the new task or update an existing one
      setTasks((prev) => [...prev, newTask]);
    };

    socket.on('taskUpdated', handleTaskUpdated);

    // Cleanup on unmount
    return () => {
      socket.off('taskUpdated', handleTaskUpdated);
    };
  }, [socket]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', { title, description, status });
      // The task may be added via real-time socket, so you can choose to update or not
      setMessage('Task created!');
      setTitle('');
      setDescription('');
      setStatus('pending');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to create task.');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleCreate}>
          <TextField
            label="Task Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'pending' | 'in progress' | 'completed')}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Task
          </Button>
        </form>
        {message && (
          <Typography color="error" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
      <Box>
        {tasks.map((task) => (
          <Paper key={task.id} sx={{ p: 2, mb: 1 }}>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2">{task.description}</Typography>
            <Typography variant="caption">Status: {task.status}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Tasks;
