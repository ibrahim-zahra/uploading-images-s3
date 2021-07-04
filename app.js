const  express =require('express')
const  bodyParser =require('body-parser')
const imageRouter=require('./routes/image.route')
const authRouter=require('./routes/auth.route')

const app =express();
const PORT=5000;
app.use(bodyParser.json());
app.listen(PORT,()=>console.log(`Server is running on port: http://localhost:${PORT}`))
app.use('/image', imageRouter);
app.use('/', authRouter);
module.exports = app;

