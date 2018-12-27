module.exports = {
  Container: require('./Container'),
  ...(require('./Either')),
  IO: require('./IO'),
  Left: require('./Left'),
  Maybe: require('./Maybe'),
  Task: require('./Task'),
}