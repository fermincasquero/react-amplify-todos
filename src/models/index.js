// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "FINISHED": "FINISHED",
  "UNFINISHED": "UNFINISHED"
};

const { Todo, Category } = initSchema(schema);

export {
  Todo,
  Category,
  Status
};