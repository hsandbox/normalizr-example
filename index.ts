import * as fs from 'fs';
import { normalize, schema } from 'normalizr';

const originalData = JSON.parse(fs.readFileSync('original.json', 'utf8'));

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user,
});

// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment],
});

const normalizedData = normalize(originalData, article);

fs.writeFile('output.json', JSON.stringify(normalizedData), err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
