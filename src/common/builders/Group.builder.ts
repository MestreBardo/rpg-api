import { Group } from '../entities/Group.entity';


class GroupBuilder {
    private name: string;
    private system: string;
    private owner: string;
    private description: string;
    private isPublic: boolean;

    constructor() {
    }

    setSystem(system: string): GroupBuilder {
        if(system) 
            this.system = system;

        
        return this;
    }

    setOwner(owner: string): GroupBuilder {
        if(owner) 
            this.owner = owner;

        return this;
    }

    setName(name: string): GroupBuilder {
        if(name)
            this.name = name;

        return this;
    }

    setDescription(description: string): GroupBuilder {
        if (description)
            this.description = description;

        return this;
    }

    setIsPublic(isPublic: boolean): GroupBuilder {
        if(isPublic)
            this.isPublic = isPublic;

        return this;
    }

 
    build(): Group {
        return new Group(
            this.name,
            this.system,
            this.owner,
            this.description,
            this.isPublic
        )
    }
}

export {
    GroupBuilder
}