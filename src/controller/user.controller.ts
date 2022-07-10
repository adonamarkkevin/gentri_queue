import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
import * as EmailValidator from "email-validator";
import { generateToken } from "../middleware/auth";

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
    const { userAccess, password } = req.body;
    try {
        if (EmailValidator.validate(userAccess)) {
            let userFound = await userRepo
                .createQueryBuilder("user")
                .addSelect("user.password")
                .where("user.email = :email", {
                    email: userAccess,
                })
                .getOne();

            if (!userFound) {
                return res.status(404).send(`Invalid Request: No user found`);
            }

            compare(password, userFound.password, (err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (data) {
                    let autherizedUser = generateToken(userFound);
                    return res.send({ accessToken: autherizedUser });
                } else {
                    return res.status(401).send(`Invalid Credentials`);
                }
            });
        } else {
            let userFound = await userRepo
                .createQueryBuilder("user")
                .addSelect("user.password")
                .where("user.username = :username", {
                    username: userAccess,
                })
                .getOne();

            if (!userFound) {
                return res.status(404).send(`Invalid Request: No user found`);
            }

            compare(password, userFound.password, (err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (data) {
                    let autherizedUser = generateToken(userFound);
                    return res.send({ accessToken: autherizedUser });
                } else {
                    return res.status(401).send(`Invalid Credentials`);
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const getAllUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const currentUser = req.user;
    try {
        let userFound = await userRepo.findOne({
            where: { id: currentUser.id },
        });

        if (!userFound) {
            return res
                .status(403)
                .send(`Forbidden request: unauthorized access`);
        }

        let allUser = await userRepo.find({
            where: { department: userFound.department },
        });

        return res.send(allUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const currentUser = req.user;
    try {
        let userFound = await userRepo.findOne({
            where: { id: currentUser.id },
        });

        return res.send(userFound);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userRepo = getRepository(User);
    const { userId } = req.params;

    try {
        let userFound = await userRepo.findOne({
            where: { id: userId },
        });

        if (!userFound) {
            return res.status(404).send(`invalid request: no user found`);
        }

        await userRepo.softRemove(userFound);

        return res.send(`user has been removed`);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};
