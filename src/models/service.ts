import { DataTypes,Model } from "sequelize";
import sequelize from "../config/db";

export class Service extends Model {
    public id!: number;
    public name!: string;
    public type!: 'Normal' | 'VIP';
    public categoryId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Service.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,allowNull: false},
    type: {
        type: DataTypes.ENUM('Normal', 'VIP'),
        allowNull: false, defaultValue: 'Normal'},
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false},
},
{
    sequelize,tableName: "services",timestamps: true,

}
);

export default Service;