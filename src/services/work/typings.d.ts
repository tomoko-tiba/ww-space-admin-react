declare namespace API {
    type Work = {
        id: number
        title: string
        content: string
        imgSrc: string
        likes: number
        views: number
        time: string
        category: string | null
        categoryName?: string
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
        category: string | null
        categoryName?: string
    }

    export type WorkInput = {
        title: string
        content: string
        imgSrc: string
        category: string
    }

}