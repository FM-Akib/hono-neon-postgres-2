import { Hono } from 'hono'
import { serve } from '@hono/node-server';
import { UserRoutes } from '../src/routes/routes'
const app = new Hono()


app.route('/api', UserRoutes);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})



// Start the server
const port = 3000; // Choose your preferred port
const server = serve(app); // Start the server


// Handle any errors when starting the server
server.on('error', (error: Error) => {
    console.error('Failed to start server:', error.message);
});

// If the server starts successfully, log the URL
console.log(`Server is running at http://localhost:${port}`);

export default app;

