const app = require('./app');
const port = process.env.PORT || 3000;

const authRoute = require('./routes/auth.route'); 
const followRoute = require('./routes/follow.route');

app.use('/auth', authRoute);
app.use('/follows',followRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));