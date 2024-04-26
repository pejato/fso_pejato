const dontSerializeMongoPrivateFields = (schema, extraFields = []) =>
  schema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      for (const field of extraFields) {
        delete returnedObject[field];
      }
    },
  });

module.exports = { dontSerializeMongoPrivateFields };
