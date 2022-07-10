import { hash } from "bcrypt";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";

export const registUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const {
        username,
        email,
        password,
        firstName,
        middleName,
        lastName,
        birthdate,
        address,
        brgy,
        municipality,
        province,
        department,
    } = req.body;
    try {
        let hashpassword = await hash(password, 10);

        let userFound = await userRepo.findOne({
            where: { firstName, lastName, birthdate, email },
        });

        if (userFound) {
            return res.status(409).send(`Invalid Request: User already exist`);
        }

        const userCreate = userRepo.create({
            username: username,
            email: email,
            password: hashpassword,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            birthdate: birthdate,
            address: address,
            brgy: brgy,
            municipality: municipality,
            province: province,
            department: department,
        });

        await userRepo.save(userCreate);

        return res.send(userCreate);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
};

export const getAllUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
};

export const getUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
};

export const deleteUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
};
