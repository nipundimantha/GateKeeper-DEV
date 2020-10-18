import express from 'express';
import Supplier from '../models/supplierModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const suppliers = await Supplier.find({ ...category, ...searchKeyword }).sort(
    sortOrder
  );
  res.send(suppliers);
  console.log(JSON.stringify(suppliers));
});

router.get('/:id', async (req, res) => {
  const supplier = await Supplier.findOne({ _id: req.params.id });
  if (supplier) {
    res.send(supplier);
  } else {
    res.status(404).send({ message: 'Supplier Not Found.' });
  }
});
router.post('/:id/reviews', isAuth, async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  if (supplier) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    supplier.reviews.push(review);
    supplier.numReviews = supplier.reviews.length;
    supplier.rating =
      supplier.reviews.reduce((a, c) => c.rating + a, 0) /
      supplier.reviews.length;
    const updatedSupplier = await supplier.save();
    res.status(201).send({
      data: updatedSupplier.reviews[updatedSupplier.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Supplier Not Found' });
  }
});
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const supplierId = req.params.id;
  const supplier = await Supplier.findById(supplierId);
  if (supplier) {
    supplier.name = req.body.name;
    supplier.image = req.body.image;
    supplier.email = req.body.email;
    supplier.location = req.body.location;
    const updatedSupplier = await supplier.save();
    if (updatedSupplier) {
      return res
        .status(200)
        .send({ message: 'Supplier Updated', data: updatedSupplier });
    }
    console.log(JSON.stringify(updatedSupplier));
  }
  return res.status(500).send({ message: ' Error in Updating Supplier.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedSupplier = await Supplier.findById(req.params.id);
  if (deletedSupplier) {
    await deletedSupplier.remove();
    res.send({ message: 'Supplier Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const supplier = new Supplier({
    name: req.body.name,
    image: req.body.image,
    email: req.body.email,
    location: req.body.location,
    numReviews: req.body.numReviews,
  });
  const newSupplier = await supplier.save();
  if (newSupplier) {
    return res
      .status(201)
      .send({ message: 'New Supplier Created', data: newSupplier });
  }
  return res.status(500).send({ message: ' Error in Creating Supplier.' });
});

export default router;
