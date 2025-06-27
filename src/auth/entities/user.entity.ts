import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column("text")
  fullname: string;
  @Column("text")
  email: string;
  @Column("text")
  accessToken: string;
  @Column("text")
  refreshToken: string;
}
