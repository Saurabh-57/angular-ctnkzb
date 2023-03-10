export interface Teams {
    data: ITeams[];
    id: number;
    full_name: string;
}

interface ITeams {
    data: Array<ITeams>;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}
