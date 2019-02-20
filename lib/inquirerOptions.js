module.exports = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What\'s your project name?',
    validate: function (value) {
      var pass = value.match(/^\S[^?'"“”\\/<>|]+$/i);
      if (pass) {
        return true;
      }
      return 'Please enter a valid project name';
    }
  }
]