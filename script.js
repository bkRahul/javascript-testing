const fetch = require('node-fetch');

const googleDb = [
  'cats.com',
  'onlycats.com',
  'scaredofcats.com',
  'dogs.com',
  'scaredofdogs.com',
  'onlydogs.com',
  'catsndogs.com',
  'animals.com',
  'soups.com',
  'recipes.com',
];

const googleSearch = (searchInput, db) => {
  let websites = db.filter(website => website.includes(searchInput));
  return websites.length > 2 ? websites.slice(0, 2) : websites;
};

//googleSearch('cat', googleDb);

//api call
const getPeople = async fetch => {
  let resp = await fetch('https://swapi.dev/api/people/');
  let { count, results } = await resp.json();
  //  console.log({ count, results });
  return { count, results };
};

//getPeople(fetch);

module.exports = { googleSearch, getPeople };
