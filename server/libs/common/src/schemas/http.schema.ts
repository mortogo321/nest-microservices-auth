const schema = {
  properties: {
    status: { type: 'boolean' },
    statusCode: { type: 'number' },
    path: { type: 'string' },
    message: { type: 'string' },
    data: { type: 'object' },
    timestamp: { type: 'string' },
  },
};

export const HttpResponseSchema = {
  status: 200,
  schema,
};
