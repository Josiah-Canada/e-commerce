const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// <3
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll()
  .then(function(tagData) {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// x
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne()
  .then(function(tagData) {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// x return newly created id, but leaves tag_name null
router.post('/', (req, res) => {
  // create a new tag
 Tag.create({
    new_category: req.body.Category
  }).then(function(tagData) {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});
// x
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData[0]) {
      res.status(404).json({message: 'please edit a validTag'});
      return;
    }
    res.json(tagData);
  })
});
// x
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
 Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'NoTag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
