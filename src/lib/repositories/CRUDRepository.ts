import { PaginatedContent } from "./PaginatedContent";

export interface CRUDRepository<TPK, TEntity>{
    save(entity: TEntity): Promise<TEntity>;
    findByPk(pk: TPK): Promise<TEntity>;
    findAll(page: number, limit: number): Promise<PaginatedContent<TEntity>>;
    count(): Promise<number>;
    existByPk(pk: TPK): Promise<boolean>;
    deleteByPk(pk: TPK): Promise<void>;
}