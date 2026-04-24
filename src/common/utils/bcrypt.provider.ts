import * as bc from 'bcrypt';

const saltRounds = 12;
export const bcryptProvider = {
  hashProvider: async (plainPass: string) => {
    const hashPass = await bc.hash(plainPass, saltRounds);
    return hashPass;
  },
};
