import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export const ROLES = ['admin', 'user'] as const;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    length: 30,
  })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    enum: ROLES,
    default: 'user',
  })
  role: string;
}
