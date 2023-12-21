export abstract class DataDecrypterRepository {
  abstract decrypt(data: string): string;
}
