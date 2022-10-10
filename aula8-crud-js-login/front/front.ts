import express, {Express} from 'express';
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname)));

app.listen(8080, function()
{
    console.log("Front online!");
});
