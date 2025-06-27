require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/conn')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/userRoutes')
const resumeRouter = require('./routes/resumeRoutes')
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))

app.use(cookieParser())

app.get("/",(req,res)=>{
  res.json({message:"Api working"})
})

//routes
app.use('/api/user',userRouter)
app.use('/api/resumes',resumeRouter)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})