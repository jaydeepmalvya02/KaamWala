const myServices = {
  // Create a new record
  create: async (model, data) => {
    try {
      const newRecord = await model.create(data);
      return {
        success: true,
        data: newRecord,
        message: `New ${model.modelName} created successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error creating ${model.modelName}: ${error.message}`,
      };
    }
  },

  // Read a record by ID
  read: async (model, id, populate = "", where = {}) => {
    try {
      const record = await model
        .findOne({ _id: id, ...where })
        .populate(populate);
      if (!record) {
        return {
          success: false,
          message: `${model.modelName} with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: record,
        message: `${model.modelName} with id ${id} retrieved successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving ${model.modelName}: ${error.message}`,
      };
    }
  },

  // Update a record by ID
  update: async (model, id, data) => {
    try {
      const updatedRecord = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedRecord) {
        return {
          success: false,
          message: `${model.modelName} with id ${id} not found`,
        };
      }
      return {
        success: true,
        data: updatedRecord,
        message: `${model.modelName} with id ${id} updated successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating ${model.modelName}: ${error.message}`,
      };
    }
  },

  // Delete a record by ID
  delete: async (model, id) => {
    try {
      const deletedRecord = await model.findByIdAndDelete(id);
      if (!deletedRecord) {
        return {
          success: false,
          message: `${model.modelName} with id ${id} not found`,
        };
      }
      return {
        success: true,
        message: `${model.modelName} with id ${id} deleted successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting ${model.modelName}: ${error.message}`,
      };
    }
  },

  // List all records
  list: async (model, populate = "", where = {}, limit = 10, skip = 0) => {
    try {
      const records = await model
        .find(where)
        .populate(populate)
        .limit(limit)
        .skip(skip);
      return {
        success: true,
        data: records,
        message: `All ${model.modelName}s retrieved successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving ${model.modelName}s: ${error.message}`,
      };
    }
  },

  // Paginated list
  listPagination: async (
    model,
    populate = "",
    page = 1,
    limit = 10,
    where = {}
  ) => {
    try {
      const skip = (page - 1) * limit;
      const [records, count] = await Promise.all([
        model.find(where).populate(populate).limit(limit).skip(skip),
        model.countDocuments(where),
      ]);
      return {
        success: true,
        data: records,
        totalPages: Math.ceil(count / limit),
        count,
        message: `All ${model.modelName}s retrieved with pagination!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error fetching paginated ${model.modelName}s: ${error.message}`,
      };
    }
  },

  // Find one by condition
  checkExist: async (model, where = {}, populate = "") => {
    try {
      const record = await model.findOne(where).populate(populate);
      if (!record) {
        return {
          success: false,
          message: `No ${model.modelName} record found matching the criteria.`,
        };
      }
      return {
        success: true,
        data: record,
        message: `${model.modelName} record retrieved successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving ${model.modelName} record: ${error.message}`,
      };
    }
  },

  // Find all by condition
  checkAllExist: async (model, where = {}, populate = "") => {
    try {
      const records = await model.find(where).populate(populate);
      return {
        success: true,
        data: records,
        message: `${model.modelName} records retrieved successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving ${model.modelName} records: ${error.message}`,
      };
    }
  },

  // Update by condition
  updateByWhere: async (model, where, data) => {
    try {
      const record = await model.findOneAndUpdate(where, data, { new: true });
      if (!record) {
        return {
          success: false,
          message: `${model.modelName} not found with the provided criteria`,
        };
      }
      return {
        success: true,
        data: record,
        message: `${model.modelName} updated successfully!`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error updating ${model.modelName}: ${error.message}`,
      };
    }
  },
};

module.exports = myServices;
