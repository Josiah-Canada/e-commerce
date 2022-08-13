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

// <3 
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id}
  })
  .then(function(tagData) {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// <3
router.post('/', (req, res) => {
  // create a new tag
 Tag.create({
    tag_name: req.body.tag_name
  }).then(function(tagData) {
    res.status(201).json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// <3
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

// <3
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
