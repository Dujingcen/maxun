import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../db/config';
import { hashPassword, comparePassword } from '../utils/auth';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
}

// Optional fields for creating a new user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    public async isValidPassword(password: string): Promise<boolean> {
        return comparePassword(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'user',
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await hashPassword(user.password) as string;
                }
            },
        },
    }
);

export default User;
