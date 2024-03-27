import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Roles } from '../model/role.enum';

@Entity('user_auth')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'is_active', default: true, nullable: false })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Roles,
    array: true,
  })
  roles: Roles[];
}
