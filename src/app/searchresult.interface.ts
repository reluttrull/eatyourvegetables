export interface FoodSearchResult {
  fdcId: number,
  description: string,
  foodCategory: string,
  score: number
}
export interface SearchResult {
  foods: FoodSearchResult[]
}