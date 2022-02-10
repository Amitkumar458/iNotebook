const connecttomongo = require("./connection/conn");
const cors = require("cors");
const express = require("express");
app = express();
connecttomongo();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.use("/api/auth" , require('./routes/auth'));
app.use("/api/notes" , require('./routes/notes'));

app.listen(port , ()=> {
   console.log(`server is listen at http://localhost:${port}`);
});
