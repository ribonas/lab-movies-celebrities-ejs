const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/create', async (req, res) => {
  const {name, occupation, catchPhrase} = req.body;

  const celebrity = new Celebrity({
    name,
    occupation,
    catchPhrase
  });

  try {
    await celebrity.save();
    res.redirect('/celebrities');
  } catch (err) {
    console.error(err);
    res.render('celebrities/new-celebrity', {error: 'An error occurred while saving the celebrity'});
  }
});

router.get('/', async (req, res) => {
    try {
    const celebrities = await Celebrity.find();
    res.render('celebrities/celebrities', {celebrities});
    } catch (err) {
    console.error(err);
    res.send('An error occurred while retrieving the celebrities');
    }
});

module.exports = router;
