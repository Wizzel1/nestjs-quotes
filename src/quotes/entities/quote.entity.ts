import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  quote: string;

  @Column({
    nullable: false,
    length: 30,
  })
  author: string;
}
