export interface proposalComments {
    all: Comment[];
}

export interface Comment {  
    id: string
    proposalId: string
    artistId: string
    content: string
    createdAt: Date
    updatedAt: Date
}
