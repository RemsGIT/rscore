export interface Participant {
    name: string,
    points: Point[]
}

export interface Point {
    value: number,
    round?: number
}