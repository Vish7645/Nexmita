import express from 'express'
import usersRouter from './routes/users.js'
import likesRouter from './routes/likes.js'
import postsRouter from './routes/posts.js'
import commentsRouter from './routes/comments.js'
import authRouter from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app= express()
const port=5050

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)
app.use('/api/comments',commentsRouter)
app.use('/api/posts/',postsRouter)
app.use('/api/likes',likesRouter)
app.listen(port,()=>{
    console.log("App listening on " + port);
})