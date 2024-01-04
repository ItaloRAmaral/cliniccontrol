import 'dotenv/config';

import { constants, privateDecrypt, publicEncrypt } from 'crypto';

import { DataDecrypterRepository } from '../repository/data-decrypter-repository';
import { DataEncrypterRepository } from '../repository/data-encrypter-repository';

const PRIVATE_KEY = process.env['JWT_PRIVATE_KEY'] as string;
const PUBLIC_KEY = process.env['JWT_PUBLIC_KEY'] as string;

export class DataEncrypterService
  implements DataEncrypterRepository, DataDecrypterRepository
{
  private publicKey: Buffer;
  private privateKey: Buffer;

  constructor() {
    this.publicKey = Buffer.from(PUBLIC_KEY, 'base64');
    this.privateKey = Buffer.from(PRIVATE_KEY, 'base64');
  }

  public encrypt(data: string): string {
    const buffer = Buffer.from(data, 'utf-8');
    const encrypted = publicEncrypt(
      {
        key: this.publicKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      buffer
    ).toString('base64');

    return encrypted;
  }

  public decrypt(data: string): string {
    const buffer = Buffer.from(data, 'base64');
    const decrypted = privateDecrypt(
      {
        key: this.privateKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      buffer
    ).toString('utf-8');

    return decrypted;
  }
}
