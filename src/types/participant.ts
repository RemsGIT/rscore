export interface Participant {
    name: string,
    points?: Point[]
}

export interface Point {
    round: number,
    point: number
}