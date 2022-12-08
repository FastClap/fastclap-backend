import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  projectId!: string;

  @Column()
  position!: number;

  @Column()
  length!: number;

  @Column()
  categoryId!: string;

  @Column()
  content!: string;
}
