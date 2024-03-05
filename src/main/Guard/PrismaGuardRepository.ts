import { PrismaClient } from "@prisma/client";
import { PaginatedContent } from "../../lib/repositories/PaginatedContent";
import { PrismaRepository } from "../../lib/repositories/PrismaRepository";
import { StudentEntrance } from "../Entrance/StudentEntrance";
import { StudentExit } from "../Exits/StudentExit";
import { Guard } from "./Guard";
import { GuardRepository } from "./GuardRepository";
import { PaginationOptions } from "../../lib/repositories/PaginationOptions";
import { EmailUnavailableError } from "./EmailUnavailableError";
import { GuardByEmailDoesNotExistError } from "./GuardByEmailDoesNotExistError";
import { GuardByIdDoesNotExistError } from "./GuardByIdDoesNotExistError";

export class PrismaGuardRepository extends PrismaRepository implements GuardRepository{

    constructor(prismaClient: PrismaClient){
        super(prismaClient);
    }
    
    public async findByRole(
        role: "admin" | "guard", 
        paginationOptions: PaginationOptions = { page:1, limit: 10}
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { role }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { role }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByGender(
        gender: "male" | "female", 
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { sex: gender }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { sex: gender }, take: paginationOptions.limit, skip, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByFirstname(
        firstname: string, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { firstname }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit );
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { firstname }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'}});
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByMiddlename(
        middlename: string, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10 }
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { middlename }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { middlename }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findByLastname(
        lastname: string, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { lastname }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { lastname}, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findActive(
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { isActive: true }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { isActive: true }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findDisabled(
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.prisma.guards.count({ where: { isActive: false }});
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.guards.findMany({ where: { isActive: false }, skip, take: paginationOptions.limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async countEntrancesCheckedById(id: string): Promise<number> {
        return await this.prisma.studentEntrances.count({ where: { checkedBy: { id }}});
    }

    public async countExitsCheckedById(id: string): Promise<number> {
        return await this.prisma.studentExits.count({ where: { checkedBy: { id }}});
    }

    public async findEntrancesCheckedById(
        id: string, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<StudentEntrance>> {
        const totalItems = await this.countEntrancesCheckedById(id);
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.studentEntrances.findMany(
            { where: { checkedBy: { id }}, skip, take: paginationOptions.limit, orderBy: { timeEntered: 'desc'} }
        );
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async findExitsCheckedById(
        id: string, 
        paginationOptions: PaginationOptions = { page: 1, limit: 10}
    ): Promise<PaginatedContent<StudentExit>> {
        const totalItems = await this.countExitsCheckedById(id);
        const currentPage = paginationOptions.page;
        const totalPages = Math.ceil(totalItems / paginationOptions.limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * paginationOptions.limit;
        const content = await this.prisma.studentExits.findMany(
            { where: { checkedBy: { id } }, skip, take: paginationOptions.limit, orderBy: { timeExited: 'desc'} }
        )
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async existByEmail(email: string): Promise<boolean> {
       return await this.prisma.guards.count({ where:{ email }}) > 0;
    }

    public async findByEmail(email: string): Promise<Guard> {
        if(!await this.existByEmail(email))
            throw new GuardByEmailDoesNotExistError(email);
        return await this.prisma.guards.findUniqueOrThrow({ where: { email }});
    }

    public async save(entity: Guard): Promise<Guard> {
        if(entity.id && await this.existByPk(entity.id))
            return await this.prisma.guards.update({ data: entity, where: { id: entity.id } });
        if(await this.existByEmail(entity.email))
            throw new EmailUnavailableError(entity.email);
        return await this.prisma.guards.create({ data: entity });
    }

    public async findByPk(pk: string): Promise<Guard> {
        if(!await this.existByPk(pk))
            throw new GuardByIdDoesNotExistError(pk);
        return await this.prisma.guards.findUniqueOrThrow({ where: { id: pk }});
    }

    public async findAll(page: number = 1, limit: number = 10): Promise<PaginatedContent<Guard>> {
        const totalItems = await this.count();
        const currentPage = page;
        const totalPages = Math.ceil(totalItems / limit);
        const hasPreviousPages = currentPage > 1;
        const hasNextPage = currentPage < totalPages;
        const skip = (currentPage - 1) * limit;
        const content = await this.prisma.guards.findMany({ skip, take: limit, orderBy: { timeAdded: 'desc'} });
        return { totalItems, currentPage, totalPages, hasPreviousPages, hasNextPage, content };
    }

    public async count(): Promise<number> {
        return await this.prisma.guards.count();
    }

    public async existByPk(pk: string): Promise<boolean> {
        return await this.prisma.guards.count({ where: { id: pk }}) > 0;
    }

    public async deleteByPk(pk: string): Promise<void> {
        if(!await this.existByPk(pk))
            throw new GuardByIdDoesNotExistError(pk);
        await this.prisma.guards.delete({ where: { id: pk }});
    }
}