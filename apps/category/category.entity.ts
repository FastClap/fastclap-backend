import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;
}
