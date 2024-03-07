declare namespace API {
    type Category = {
        id: number;
        name: string;
        orderIndex: int;
    };
    
    export type CategoryInput = {
        name: string;
        orderIndex: int;
    }

}