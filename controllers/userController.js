import express from 'express';
import md5 from 'md5';
import CryptoJS from 'crypto-js';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';
import validate from '../utils/userValidator.js'
import {fileURLToPath} from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    register (req, res)  {
        const body = req.body;
        const registerValidate = validate.register(body)

        try {
            if (!registerValidate.haveErrors) {
                body.email = body.email.toLowerCase();

                const filePath = './users/' + body.email + '.json'
                if (fs.existsSync(filePath)) {
                    return res.status(400).json({ error: "User already exists" });
                }

                body.id = uuidv4();
                body.password = md5(body.password);
                console.log(body)
                fs.writeFileSync( filePath, JSON.stringify(body, null, 2), 'utf8');

                return res.status(201).json({ message: "User registered successfully" });
            }
            return res.status(400).json(registerValidate);


        }catch(err) {
            console.log(err)
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    login (req, res) {
        const body = req.body;
        const loginValidation = validate.login(body);
        try {
            if (!loginValidation.haveErrors) {

                const email = body.email.toLowerCase();
                const userFilePath = path.join(__dirname, '../users/', `${email}.json`);

                if (fs.existsSync(userFilePath)) {

                    const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

                    if (md5(body.password) === userData.password) {

                        const SECRET = 'NodeJS';
                        const hash = CryptoJS.AES.encrypt(JSON.stringify({
                            email: userData.email,
                            id: userData.id,
                        }), SECRET).toString();

                        userData.token = hash;
                       return  res.json({ "Your x-token": hash });
                    } else {
                        res.status(401).json({ "message": "Invalid password" });
                    }
                } else {
                    res.status(404).json({ "message": "User not found" });
                }

            }
            return res.status(400).json(loginValidation);


        }catch (err){
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });

        }

    },
    getUserProfile(req, res) {
        const body = req.body;
        const validateGetProfile = validate.getProfile(body);
        try {
            if (!validateGetProfile.haveErrors) {

                const email = body.email.toLowerCase();
                const userFilePath = path.join(__dirname, '../users/', `${email}.json`);

                if (fs.existsSync(userFilePath)){
                    const userData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));

                    if (userData.password === md5(body.password)) {
                        return  res.json(200,userData);
                    }else{
                        res.send(404,{"message": "invalid password"});
                    }

                }else{
                    res.send(400,{"message":"user not found"})
                }
            }else{
                res.send(400,{"message": validateGetProfile});
            }
        }catch (err){
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });

        }
    }
}