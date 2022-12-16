import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  projectId!: string;

  @Column()
  categoryId!: string;

  @Column()
  sequenceId!: string;

  @Column()
  content!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updatedAt!: Date;
}
