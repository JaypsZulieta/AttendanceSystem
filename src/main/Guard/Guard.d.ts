export type Guard = {
    id?: string,
    isActive?: boolean,
    email: string,
    encodedPassword: string,
    firstname: string,
    middlename?: string | null,
    lastname: string,
    sex: "male" | "female",
    role: "guard" | "admin",
    profileImageURL?: string,
    timeAdded?: Date
}