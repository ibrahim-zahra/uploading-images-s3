const express = require('express')
const bodyParser = require('body-parser')
const imageRouter = require('./routes/image.route')
const authRouter = require('./routes/auth.route')

const app = express();
const PORT = 5001;
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
}
app.use('/image', imageRouter);
app.use('/', authRouter);


process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
module.exports = app;

