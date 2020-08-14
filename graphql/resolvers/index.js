const queryResolvers = require('./Query');
const mutationResolvers = require('./Mutation');

module.exports = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};
