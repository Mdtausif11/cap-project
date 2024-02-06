using FirstApp.db as my  from '../db/schema';

Service CatalogService {
    entity Employee as projection on my.Employee; 
    entity Address as projection on my.Address; 
    entity Department as projection on my.Department; 
    entity Company as projection on my.Company; 
}