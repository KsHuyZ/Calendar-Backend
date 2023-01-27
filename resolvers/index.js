import UserModel from "../models/UserModel";

export const resolvers = {
  Mutation: {
    createUserbyGoogle: async (parent, args) => {
      const foundUser = await UserModel.findOne({ email: args.email });
      if (!foundUser) {
        const newUser = new UserModel(args);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
