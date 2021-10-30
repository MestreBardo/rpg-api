import { Member } from '../entities/Member.entity';


class MemberBuilder {
    private user: string;
    private group: string;
    private role: string;

    constructor() {
    }

    setUser(user: string): MemberBuilder {
        if(user) 
            this.user = user;

        
        return this;
    }

    setGroup(group: string): MemberBuilder {
        if(group) 
            this.group = group;

        return this;
    }

    setRole(role: string): MemberBuilder {
        if(role)
            this.role = role;

        return this;
    }

 
    build(): Member {
        return new Member(
            this.user,
            this.group,
            this.role
        )
    }
}

export {
    MemberBuilder
}