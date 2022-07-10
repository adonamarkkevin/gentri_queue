import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Queue } from "../entity/Queue.entity";
import { User } from "../entity/User.entity";
import { Visit } from "../entity/Visit.entity";

export const createQueue = async (req: Request, res: Response) => {
    const queueRepo = getRepository(Queue);
    const visitRepo = getRepository(Visit);

    const {
        email,
        contact_number,
        firstName,
        middleName,
        lastName,
        birthdate,
        address,
        brgy,
        municipality,
        province,
        department,
        visit_purpose,
    } = req.body;
    try {
        let queueLength = await queueRepo.find();

        let queue_number = String(queueLength.length + 1).padStart(3, "0");

        let visitorToCreate = visitRepo.create({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            birthdate: birthdate,
            email: email,
            contact_number: contact_number,
            address: address,
            brgy: brgy,
            municipality: municipality,
            province: province,
        });

        await visitRepo.save(visitorToCreate);

        let queueToCreate = queueRepo.create({
            queue_number: queue_number,
            department: department,
            visit_purpose: visit_purpose,
            visitor: visitorToCreate,
        });

        await queueRepo.save(queueToCreate);

        return res.send(queueToCreate);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const updateQueue = async (req: Request, res: Response) => {
    const queueRepo = getRepository(Queue);
    const userRepo = getRepository(User);
    const currentUser = req.user;
    const { queue_number } = req.params;
    const { department, visit_purpose, status } = req.body;

    try {
        let userFound = await userRepo.findOne({
            where: { id: currentUser.id },
        });

        let queueFound = await queueRepo.findOne({
            where: { queue_number: queue_number },
            relations: ["visitor"],
        });

        queueFound.department = department;
        queueFound.status = status;
        queueFound.visit_purpose = visit_purpose;
        queueFound.served_by = userFound.fullName;

        await queueRepo.save(queueFound);

        return res.send(queueFound);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error: ${error}`);
    }
};

export const getAllQueue = async (req: Request, res: Response) => {
    const queueRepo = getRepository(Queue);
};

// export const Queue = async (req: Request, res: Response) => {

// }
