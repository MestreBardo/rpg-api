import { Request } from "express";

declare interface RequestWithUser extends Request {
    user: User;
    token: any;
    member: Member;
    otherMember: Member;
    group: Group;
    campaign: Campaign;
    player: Player
}