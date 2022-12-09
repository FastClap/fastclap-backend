import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sequence' })
export class Sequence {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  projectId!: string;
}
