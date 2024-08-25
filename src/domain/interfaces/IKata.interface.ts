export enum KataLevel {
  BASIC = 'BASIC',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface IKata {
  id: string,
  name: string,
  description: string,
  level: KataLevel,
  intents: number,
  stars: number,
  creator: string, // Id of User
  solution: string,
  participants: string []
}