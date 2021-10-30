class Member {
    user: string;
    group: string;
    role: string;
    joinedAt: Date = new Date();

    constructor(
        user: string,
        group: string,
        role: string,
    ) {
        this.user = user,
        this.group = group,
        this.role = role
    }
}

export {
    Member
}