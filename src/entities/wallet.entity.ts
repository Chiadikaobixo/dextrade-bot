import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'wallets' })
export class Wallet extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: false })
  telegram_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  wallet_address: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  wallet_private_key: string;
}
