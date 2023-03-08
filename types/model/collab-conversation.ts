export interface CollabConversation {
    all: Comment[];
}

export interface Comment {  
    id: string
    collabId: string
    artistId: string
    content: string
    createdAt: Date
    updatedAt: Date
}
