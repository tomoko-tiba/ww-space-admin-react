declare namespace API {
    type User = {
        id: number;
        userName: string;
        userIntro: string | null;
        userPhoto: string | null;
        password?: string;
    };

    export type UserCreateInput = {
        userName: string
        email?: string | null
        userIntro?: string | null
        userPhoto?: string | null
        password: string
    }

    export type UserUpdateInput = {
        userName?: string
        email?: string | null
        userIntro?: string | null
        userPhoto?: string | null
        password?: string
    }
}