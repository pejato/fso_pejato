import createEndpointsGenerator from '../endpointHelpers';

const getUsers = (builder) =>
  builder.query({
    query: () => '/users',
    providesTags: ['Users'],
  });
const getUser = (builder) =>
  builder.query({
    query: (id) => `/users/${id}`,
    providesTags: (result, error, id) => [{ type: 'User', id }],
  });
export default createEndpointsGenerator({ getUsers, getUser });
