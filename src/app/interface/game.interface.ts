export interface GameList {
    id: string,
    name: string,
    imageUrl: string,
    descp: string,
    providerId: string,
    lastUpdateTime: Date,
    gameId: string,
    configFile: string,
    excuteMode: string,
    filename: string
}

export interface GameProvider { 
    id: string,
    companyName: string,
    companyTel: string,
    companyLoc: string,
    providerId: string
}

export interface GameServer {
    gameIP: string,
    gamestatus: string // true or false
}