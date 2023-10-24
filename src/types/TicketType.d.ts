export interface GuildType {
    id: string;
    colorR: number;
    colorG: number;
    colorB: number;
}

export interface UserType {
    id: string;
    name: string;
}

export interface TicketResponseType {
    id: string;
    content: string;
    sent_ago: string;
    user: UserType;
}

export interface TicketType {
    id: string;
    title: string;
    status: number;
    createat: string;
    closeat: string | null;
    last_update: string | null;
    user: UserType;
    staff_help: UserType;
    guild: GuildType;
    tickets_responses: TicketResponseType[];
}
