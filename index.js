const express = require('express');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger')

const dotenv= require("dotenv");
dotenv.config();

const connectDB = require('./config/db.js')

const PORT = process.env.PORT;

const app= express();

connectDB();

app.use(express.json());

const authRoute = require('./routes/authRoute.js');
app.use('/api/auth', authRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({ message: "HEy form home page" })
});


app.listen(PORT, ()=> console.log(`Server Started on PORT ${PORT}`)
);