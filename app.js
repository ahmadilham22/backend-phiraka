const express = require('express');
const userRoute = require('./routes/user-route.js');
const authRoute = require('./routes/auth-route.js');
const cors = require('cors');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
