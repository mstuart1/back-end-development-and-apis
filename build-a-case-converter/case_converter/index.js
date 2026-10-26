const getUpperCase = (str) => {
    return str.toUpperCase()
}

const getLowerCase = (str) => str.toLowerCase()

const getSentenceCase = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getProperCase = (str) => str
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ');


  module.exports = {
    getUpperCase, 
    getLowerCase,
    getSentenceCase,
    getProperCase
  }