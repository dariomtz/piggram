const app = require('./app');
const port = process.env.PORT || 3000;

const authRoute = require('./routes/auth.route'); 

app.use('/auth', authRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));