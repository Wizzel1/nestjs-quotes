import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    length: 30,
  })
  @Exclude()
  password: string;
}
