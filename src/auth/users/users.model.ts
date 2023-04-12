import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

interface UsersCreationAttrs {
    email: string;
    password: string
}

@Table( {tableName: 'users'})
export class Users extends Model<Users, UsersCreationAttrs > {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({type: DataType.STRING, allowNull: false })
    password: string;


}