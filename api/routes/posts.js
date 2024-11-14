import express from 'express'
import {} from '../controllers/posts.js'
import { getPosts,addPost} from '../controllers/posts.js';

const router=express.Router()

router.get("/",getPosts);
router.post("/",addPost)

export default router