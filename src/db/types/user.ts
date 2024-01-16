import type { ObjectId } from "mongodb"

export interface User {
    _id: ObjectId,
    URL: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photos: any[],
}

export interface UserWithoutId extends Omit<User, '_id'> {}
export interface UserWithoutPassword extends Omit<User,'password'>{}