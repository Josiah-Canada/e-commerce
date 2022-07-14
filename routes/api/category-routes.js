const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// <3
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
  .then(function(categoryData) {
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// x
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(id)
  .then(function(categoryData) {
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// <3
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(categoryData => res.json(categoryData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// x
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    if (!categoryData[0]) {
      res.status(404).json({message: 'please edit a valid category'});
      return;
    }
    res.json(categoryData);
  })
});
// x
router.delete('/:id', (req, res) => {
  // delete route
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
