import { DataTypes , Model } from "sequelize"; 
import sequelize from "../config/db";

export class Category extends Model {
    declare id: number;
    declare name: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Category.init(
    {id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,},name:{type:DataTypes.STRING,allowNull:false,unique:true,},},{sequelize,tableName:"categories",timestamps:true,}
);

export default Category;