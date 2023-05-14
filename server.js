import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//     res.sendFile('index.html')})
// ;

app.post("")

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
