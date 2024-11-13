import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    // Query to check if user already exists
    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists");

        // Generate salt and hashed password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // Insert new user into database
        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
            req.body.name
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User is Created");
        });
    });
};
export const login=(req,res)=>{
   const q="select * from users where username=?"
   db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(!data.length) return res.status(400).json("User not found")
        const checkPassword=bcrypt.compareSync(req.body.password,data[0].password) // data will return a array which only contain 1 user
        if(!checkPassword) return res.status(400).json("Password is incorrect")
        
        const token=jwt.sign({id:data[0].id},"secretKey")

        const {password,...rest}=data[0]
        res.cookie("access_token",token,{
            httpOnly: true,
        }).status(200).json(rest)
   })
}
export const logout=(req,res)=>{
   res.clearCookie("access_token",{
    secure:  true,
    sameSite: "none"
   }).status(200).json("User logged out")
}