class Group {
    name: string;
    system: string;
    owner: string;
    description: string;
    isPublic: boolean;
    createdAt: Date = new Date();
    userCount: number = 0;



    constructor(
        name: string,
        system: string,
        owner: string,
        description: string,
        isPublic: boolean,
    ) {
        this.name = name,
        this.owner = owner,
        this.description = description,
        this.system = system,
        this.isPublic = isPublic
        
    }
}

export {
    Group
}