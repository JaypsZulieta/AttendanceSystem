export type Student = {
    lrn: string,
    firstname: string,
    middlename?: string | null,
    lastname: string,
    sex: "male" | "female",
    guardianPhonenumber: string,
    profileImageURL?: string,
    sectionId: number,
    timeAdded?: Date
}