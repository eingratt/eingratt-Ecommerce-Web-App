export class Review{
    
    public review: string;
    public rating: number;
    public productName: string;
    public userEmail: string;
    
    constructor(review: string, rating: number, productName: string, userEmail: string){
        this.review = review;
        this.rating = rating;
        this.productName = productName;
        this.userEmail = userEmail;
        
    }
}