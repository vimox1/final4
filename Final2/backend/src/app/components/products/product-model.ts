import{Category} from './physical/category/categorie-model'
export class Product{
    id?:string;
    nomProduit?:string;
    refProduit?:string;
    refFourni? : string;
    image?:string;
    description?:string;
    priceDeVente? : number;
    priceDachat?:number;
    tva?:number;
    category? : Category;
    numSurStock?:number;
    dateCreation?:Date;

}