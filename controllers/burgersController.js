
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    console.log(db.Burgers);
    db.Burgers.findAll({}).then(function(dbBurgers) {
      // We have access to the todos as an argument inside of the callback function
     //Use Render
     console.log({dbBurgers})
     res.render("index", {'burger_data': dbBurgers} );
      // res.json(dbBurgers);
    });
  });
  // POST route for saving a new todo
  app.post("/burgers/create", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Burgers.create({
      //burger_name, devoured
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(dbBurgers) {
      // We have access to the new todo as an argument inside of the callback function
      // res.json(dbBurgers);
       res.redirect("/");
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/burgers/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Burgers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurgers) {
      res.json(dbBurgers);
      res.redirect("/");
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/burgers/update", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    //burger_name, devoured
    db.Burgers.update({
      devoured: true
    }, {
      where: {
        id: req.body.burger_id
      }
    }).then(function(dbBurgers) {
    
       res.redirect("/");

    });
  });

};
