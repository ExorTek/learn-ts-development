import * as express from 'express';
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Hello World!'
    });
});
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
