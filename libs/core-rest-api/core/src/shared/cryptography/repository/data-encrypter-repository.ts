export abstract class DataEncrypterRepository {
  abstract encrypt(data: string): string;
}
