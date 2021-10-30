import { External } from "../entities/External.entity";

class User {
    imageUrl: string;
    email: string;
    name: string;
    surname: string;
    birthday: Date;
    age: number;
    password: string;
    username: string;
    external: External;
    gender: string;
    country: string;
    city: string;
    groupCount: number = 0;
    campaingCount: number = 0;


    constructor(
        email: string,
        name?: string,
        surname?: string,
        birthDay?: Date,
        password?: string,
        username?: string,
        external?: External,
        gender?: string,
        country?: string,
        city?: string,
        imageUrl?: string
    ) {
        this.email = email,
        this.name = name,
        this.surname = surname,
        this.birthday = birthDay,
        this.password = password,
        this.username = username,
        this.external = external,
        this.surname = surname,
        this.gender = gender,
        this.country = country,
        this.city = city,
        this.imageUrl = imageUrl
        
    }
}

export {
    User
}