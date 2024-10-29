import prisma from "../prismaconfig/prisma";
import { Request, Response } from "express";
import { CustomRequest } from "../types/types";
import { Role } from "@prisma/client";

export const addUserByAdmin=async(req:CustomRequest,res:Response):Promise<void>=>{
    try {
        const {name,email,role,phoneNumber}:{name:string,email:string,password:string,role:Role,phoneNumber:string}=req.body
        if(!req.user?.userid){
            res.status(401).json({
                success:false,
                message:"userid messing in req"
            })
            return
        }
        const userid=parseInt(req.user?.userid)
        const user = await prisma.user.findUnique({
            where: { id: userid }, 
        });

        if (!user) {
             res.status(404).json({
                success: false,
                message: "you are  not authenticate.",
            });
            return
        }
        const addeduser=await prisma.user.create({
            data:{
                name,
                email,
                password:email,
                role,
                phoneNumber
            }
        })
        res.status(200).json({
            success: true,
            message: "user added successfuly.",
            addeduser,
        });
        return
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error accure in addCouter",
            error
        })
    }
}
export const changePassword=async(req:Request,res:Response):Promise<void>=>{
    try {
        
    } catch (error) {
        res.status(400).json({
            success:false
        })
    }
}