import bcrypt from 'bcrypt';

export const mockBcryptCompare = (mockedValue: boolean): void => {
  const bcryptCompare = jest.fn().mockResolvedValue(mockedValue);
  (bcrypt.compare as jest.Mock) = bcryptCompare;
};
