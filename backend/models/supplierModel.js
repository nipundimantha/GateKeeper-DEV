import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, default: 0, required: true },
});

const supplierModel = mongoose.model('Supplier', supplierSchema);

export default supplierModel;
