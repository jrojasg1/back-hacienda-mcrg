export interface ICow {
  id: string,
  name: string,
  description: string,
  age: number,
  milkProduction: number,
  births: number,
  creator: string, // Id of User
}