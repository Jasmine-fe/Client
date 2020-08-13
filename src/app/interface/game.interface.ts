export interface GameList {
    id: string,
    name: string,
    imageUrl: string,
    descp: string,
    providerId: number,
    lastUpdateTime: Date,
    gameId: string
}

export interface GameProvider { 
    id: string,
    companyName: string,
    companyTel: string,
    companyLoc: string,
    providerId: string
}

export interface GameServer {
    ip: string,
    gameStatue: string // true or false
}