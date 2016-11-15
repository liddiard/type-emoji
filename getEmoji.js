const request = require('superagent');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const file = 'emoji.json';
const emoji = [];

request
.get('http://unicode.org/emoji/charts-beta/full-emoji-list.html')
.end((err, res) => {
  const $ = cheerio.load(res.text);
  $('tr').each(function(){
    const isEmojiRow = !!$(this).find('td').length;
    if (isEmojiRow) {
      emoji.push({
        char: $(this).find('.chars').text(),
        name: $(this).find('.name').first().text().toLowerCase(),
        annotations: $(this).find('.name').last().text().toLowerCase().split(' | '),
        searchMatch: 0 
      });
      jsonfile.writeFile(file, emoji, err => {
        if (err) console.error(err);
        else console.log('emoji written to', file);
      });
    }
  });
});
