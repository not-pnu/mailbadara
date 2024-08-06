export interface IDepartmentName {
    [key: string]: string;
}

export interface IDepartment {
    code: string;
    name: string;
    board_names: string[];
    boards: string[];
}
