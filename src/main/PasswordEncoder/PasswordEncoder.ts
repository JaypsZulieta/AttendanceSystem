export interface PasswodEncoder{
    encode(password: string): Promise<string>;
}