import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  // 🔐 Auth basics
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // 👤 Profile info
  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  username!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  // 🔑 Authorization
  @Column({ default: 'user' })
  role!: string; // 'user' | 'admin'

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
