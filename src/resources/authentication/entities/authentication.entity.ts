import { User } from 'src/resources/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authentication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.authentications, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  token: string;

  @Column()
  refreshToken: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
