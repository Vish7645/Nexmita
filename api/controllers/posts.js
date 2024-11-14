import {db} from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment/moment.js';
export const getPosts=async (req,res)=>{
   const token=req.cookies.accessToken;
   if(!token) return res.status(403).json("Not logged in!!")
   jwt.verify(token,"secretKey",(err,userInfo)=>{
      if(err) return res.status(403).json("Token is not valid")
      
      const q=`SELECT p.*, u.id AS userId, u.name, u.profilePic FROM posts AS p 
         JOIN users AS u ON (p.userId = u.id) 
         left JOIN relationships as r on (p.userId=r.followedUserId)
         where r.followerUserId=? OR p.userId=? order by p.createdAt desc`;
      console.log(userInfo.id);
      
      db.query(q,[userInfo.id, userInfo.id],(err,data)=>{
         if(err) return res.status(500).json(err)
         // console.log(data);
         return res.status(200).json(data)
      })
   })

}

export const addPost =async (req,res)=>{
   const token=req.cookies.accessToken;
   if(!token) return res.statu(403).josn("Login First")
   jwt.verify(token,"secretKey",(err,userInfo)=>{
   if(err) return res.status(403).json("Token is invalid")
   
   const q="insert into posts (`desc`,`img`,`createdAt`,`userId`) values (?)";

   const values=[
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
   ]
   db.query(q,[values],(err,data)=>{
      if(err) return res.status(500).json(err)
      return res.status(200).json("Post is created")
   })
})
}