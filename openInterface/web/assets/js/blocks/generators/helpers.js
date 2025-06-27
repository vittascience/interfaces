function hexEscape(str) {
  return str.replace(/[^A-Fa-f0-9]/, '').substring(0, 8).toLowerCase();
}

function fullEscape(input) {
  return escape(input)
    .replace(/%25/g, '%');
}

function looseEscape(input) {
  let stringToEscape = input;

  if (typeof input === 'number') {
    stringToEscape = input.toString();
  }

  return stringToEscape
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cssEscape(input) {
  return input
    .replace(/;/g, '')
    .replace(/{/g, '')
    .replace(/}/g, '')
    .replace(/</g, '')
    .replace(/:/g, '')
    .replace(/"/g, '\'');
}

const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const hashRegex = /#([A-z0-9]*)/;

function isNewTabUrl(input) {
  return URLRegex.test(input) || (!input.includes('http://') && !input.includes('https://')) && !hashRegex.test(input) && input.length > 0;
}

function URLInput(input) {
  input = encodeURI(input);

  if (URLRegex.test(input) || hashRegex.test(input)) {
    return input;
  } else if (isNewTabUrl(input)) {
    return 'https://' + input;
  }
}

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}