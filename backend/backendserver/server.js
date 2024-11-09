const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err =>{
        console.log('Error in connecting to MongoDB', err); 
        process.exit(1);
    });

app.get('/', (req,res) => {
    res.json({message: 'Welcome to AST tree API'});
});

app.use('/api', ruleRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});