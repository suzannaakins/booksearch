const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        //get a SINGLE user by id 
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
                .select('-__v -password')
        },

        //query the CURRENT user logged in using token
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { authors, bookId, title, description, image, link }, context) => {
            if (context.user) {

                const updatedUser =
                    await User.findByIdAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: { authors, bookId, title, description, image, link } } },
                        { new: true }
                    ).populate('savedBooks');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        // remove a book from `savedBooks`
        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;