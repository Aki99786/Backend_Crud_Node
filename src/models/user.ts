import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcrypt";    

export class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);

export async function seedAdminIfNotExists(): Promise<void> {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) {
            console.warn("Admin email or password not set in environment variables.");
            return;
        }
        const existingAdmin = await User.findOne({ where: { email: adminEmail } });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await User.create({ email: adminEmail, password: hashedPassword });
            console.log(`Admin user created: ${adminEmail}`);
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error seeding admin user:", error);
    }
}

export default User;