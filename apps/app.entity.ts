import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: 'people' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullname!: string;

  @Column()
  gender!: string;

  @Column()
  phone!: string;

  @Column()
  age!: number;

  @Column({ name: 'created_at' })
  createdAt?: Date;
}
