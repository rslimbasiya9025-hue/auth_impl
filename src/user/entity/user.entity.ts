import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../types/user.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // 🔐 Auth basics
  @Column({ unique: true, length: 100 })
  email!: string;

  @Column()
  password!: string;

  // 👤 Profile info
  @Column({ nullable: true, length: 100 })
  firstName!: string;

  @Column({ nullable: true, length: 100 })
  lastName!: string;

  @Column({ nullable: true, length: 200 })
  username!: string;

  @Column({ nullable: true, length: 20 })
  phone!: string;

  @Column({ nullable: true, length: 500 })
  avatarUrl!: string;

  // 🔑 Authorization
  @Column({ default: 'ROLE_USER' })
  role!: UserRole; // 'ROLE_USER' | 'ROLE_ADMIN'

  // ✅ Account status
  @Column({ default: false })
  isEmailVerified!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  // 🔁 Token management (for future)
  @Column({ nullable: true })
  refreshToken!: string;

  // 📅 Tracking
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // 🕒 Optional tracking
  @Column({ nullable: true })
  lastLoginAt!: Date;
}
