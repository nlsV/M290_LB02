const customer = require("./controller.js");
module.exports = (app) => {
  // Create a new Customer
  app.post("/customer", customer.create);

  // Retrieve all Customers
  app.get("/customers", customer.getAll);

  // Retrieve a single Customer with login id
  app.get('/customer/:id', customer.findById);

  // Update a Customer with customerId
  app.put('/customer/:id', customer.updateById);

  // Delete a Customer with customerId
  app.delete('/customer/:id', customer.removeById);

  // delete all customers
  app.delete('/customers', customer.removeAll);
};
