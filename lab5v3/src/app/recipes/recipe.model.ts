import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public price: number;
    public description: string;
    public amount: number;
    
    constructor(name:string,price:number, description:string, amount: number){
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount
        
    }
}