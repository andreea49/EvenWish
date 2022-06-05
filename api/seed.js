var SuggestionDB = require('./models/Suggestion')

console.log("hello");

SuggestionDB.sync({ force: true }).then(() => {
    SuggestionDB.create({
        keyword: 'dress',
        text: 'C&A super blue dress'
    });
    SuggestionDB.create({
      keyword: 'shirt',
      text: 'Zara red shirt'
    });
    SuggestionDB.create({
      keyword: 'white wine',
      text: 'Chardonnay'
    });
    SuggestionDB.create({
      keyword: 'white wine',
      text: 'Feteasca Alba'
    });
    SuggestionDB.create({
      keyword: 'red wine',
      text: 'Feteasca Neagra'
    });
    SuggestionDB.create({
      keyword: 'red wine',
      text: 'Cabernet Sauvignon'
    });
    SuggestionDB.create({
      keyword: 'red wine',
      text: 'Merlot'
    });
  });
