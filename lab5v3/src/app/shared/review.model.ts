export class Review{
    
    public review: string;
    public rating: number;
    public productName: string;
    public userEmail: string;
    public isEnabled: boolean;
    
    constructor(review: string, rating: number, productName: string, userEmail: string, isEnabled: boolean){
        this.review = review;
        this.rating = rating;
        this.productName = productName;
        this.userEmail = userEmail;
        this.isEnabled = isEnabled;
        
    }
}