export interface GameList {
    id: string,
    name: string,
    imageUrl: string,
    descp: string,
    providerId: number,
    lastUpdateTime: Date
}

export interface GameProvider { 
    id: string,
    companyName: string,
    companyTel: string,
    companyLoc: string,
}
