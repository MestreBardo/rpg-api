import { User } from '../entities/User.entity';
import { External } from './../entities/External.entity';


class UserBuilder {
    private imageUrl: string;
    private email: string;
    private username: string;
    private password: string;
    private name: string;
    private surname: string;
    private country: string;
    private city: string;
    private gender: string;
    private birthday: Date;
    private external: External;

    constructor(email: string) {
        this.email = email;
    }

    setImageUrl(url: string): UserBuilder {
        if(url) 
            this.imageUrl = url;

        
        return this;
    }

    setUsername(username: string): UserBuilder {
        if(username) 
            this.username = username;

        
        return this;
    }

    setPassword(password: string): UserBuilder {
        if(password) 
            this.password = password;

        return this;
    }

    setName(name: string): UserBuilder {
        if(name)
            this.name = name;

        return this;
    }

    setSurname(surname: string): UserBuilder {
        if (surname)
            this.surname = surname;

        return this;
    }

    setCountry(country: string): UserBuilder {
        if(country)
            this.country = country;

        return this;
    }

    setCity(city: string): UserBuilder {
        if(city)
            this.city = city;

        return this;
    }

    setGender(gender: string): UserBuilder {
        if(gender)
            this.gender = gender;

        return this;
    }

    setBirthday(birthday: string): UserBuilder {
        if(birthday) {
            const date = new Date(birthday);
            this.birthday = date;
        }

        return this;
    }

    setExternal(external: External): UserBuilder {
        if(external)
            this.external = external;

        return this;
    }
    build(): User {
        return new User(
            this.email.toLowerCase(),
            this.name.toLowerCase(),
            this.surname.toLowerCase(),
            this.birthday,
            this.password,
            this.username.toLowerCase(),
            this.external,
            this.gender.toLowerCase(),
            this.country.toLowerCase(),
            this.city.toLowerCase(),
            this.imageUrl
        )
    }
}

export {
    UserBuilder
}