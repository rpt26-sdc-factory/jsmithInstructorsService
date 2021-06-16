module.exports = (req, res) => {
  const getRandom = (max) => Math.floor(Math.random() * max);
  const max = 10000001;
  let endpoint = getRandom(max);

  while (endpoint < max * 0.9) {
    endpoint = getRandom(max);
  }

  res.redirect(`/${endpoint}`);
};