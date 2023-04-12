import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface ProfileCreationAttrs {
    name: string;
    surname: string;
    phone: string;
}

@Table( {tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs > {

    @ApiProperty({example: '1', description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    @Column({type: DataType.STRING, allowNull: false })
    surname: string;

    @ApiProperty({example: '89876543210', description: 'Телефон'})
    @Column({type: DataType.STRING, allowNull: false })
    phone: string;

}