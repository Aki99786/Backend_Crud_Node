import { DataTypes , Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface ServicePriceOptionAttributes {
    id: number;
    duration: string;
    price: number;
    type: 'Hourly' | 'Weekly' | 'Monthly';
    serviceId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

type ServicePriceOptionCreationAttributes = Optional<ServicePriceOptionAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class ServicePriceOption extends Model<ServicePriceOptionAttributes, ServicePriceOptionCreationAttributes> implements ServicePriceOptionAttributes {
    declare id: number;
    declare duration: string;
    declare price: number;
    declare type: 'Hourly' | 'Weekly' | 'Monthly';
    declare serviceId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

ServicePriceOption.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        duration: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        type: {
            type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
            allowNull: false
        },
        serviceId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, tableName: "service_price_options", timestamps: true }
);

export default ServicePriceOption;