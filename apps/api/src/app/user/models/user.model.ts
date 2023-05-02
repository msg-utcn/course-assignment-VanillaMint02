import { UserRole } from './user-roles';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false, enum: UserRole, type: 'enum', default: 'USER' })
  roles: UserRole[];
  @Column({ nullable: false })
  password: string;

  constructor(values: Partial<UserModel>) {
    if (values) {
      this.id = values.id;
      this.email = values.email;
      this.name = values.name;
      this.password = values.password;
    }
  }
}
