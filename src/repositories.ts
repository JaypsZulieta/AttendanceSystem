import { PrismaClient } from "@prisma/client";
import { PrismaGuardRepository } from "./main/Guard/PrismaGuardRepository";

const prismaClient = new PrismaClient();
export const prismaGuardRepository = new PrismaGuardRepository(prismaClient);