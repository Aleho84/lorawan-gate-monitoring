import mongoose from 'mongoose';

class MongoClass {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  };

  async getAll() {
    try {
      const all = await this.collection.find({});
      return all;
    } catch (err) {
      throw new Error(err);
    };
  };

  async get(id) {
    try {
      const one = await this.collection.findById(id);
      return one;
    } catch (err) {
      throw new Error(err);
    };
  };

  async create(doc) {
    try {
      const newDoc = await this.collection.create(doc);
      return newDoc;
    } catch (err) {
      throw new Error(err);
    };
  };

  async update(id, doc) {
    try {
      const updatedDoc = await this.collection.findByIdAndUpdate(id, doc);
      return updatedDoc;
    } catch (err) {
      throw new Error(err);
    };
  };

  async delete(id) {
    try {
      const deletedDoc = await this.collection.findByIdAndRemove(id);
      return deletedDoc;
    } catch (err) {
      throw new Error(err);
    };
  };
};

export default MongoClass;