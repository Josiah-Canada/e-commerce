const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// <3
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
});
// x
router.get('/', (req, res) => {
  Category.findOne({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err));
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
router.put('/:id', (req, res, next) => {
  // update a category by its `id` value
 Category.update(
  {category_name: req.body.category_name},
  {where: req.params.id}
 )
 .then(function(rowsUpdated) {
  res.json(rowsUpdated)
 })
 .catch(next)
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
