import path from 'path';
import express from 'express';
import apiRoutes from './routes/openaiRoutes';
import './config/env';

const port = process.env.PORT || 5000;
const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

app.use('/openai', apiRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
