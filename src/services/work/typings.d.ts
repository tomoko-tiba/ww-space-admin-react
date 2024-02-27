declare namespace API {
    type Work = {
        id: number
        title: string
        content: string
        imgSrc: string
        likes: number
        views: number
        time: string
    }

    interface WorkVO {
        id: number
        userName: string
        userIntro: string | null
        userPhoto: string | null
        title: string
        content: string
        imgSrc: string
        likes: number
        views: number
        time: string
    }

    export type WorkInput = {
        title: string
        content: string
        imgSrc: string
    }

}