let database = require("../database");

let remindersController = {
  list: (req, res) => {
    if (!req.user) {
      res.redirect("/login")
    }
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    if (!req.user) {
      res.redirect("/login")
    }
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    if (!req.user) {
      res.redirect("/login")
    }
    let reminderToFind = Number(req.params.id);
    let searchResult = database.userModel.findById(reminderToFind);
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    console.log(req.user);
    let reminder = {
      id: database.userModel.findById(req.user.id).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    
    database.userModel.findById(req.user.id).reminders.push(reminder

    )
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let user = database.userModel.findById(req.user.id);
    const searchResult = user.reminders.find(reminder => reminder.id == reminderToFind)
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToUpdate = req.params.id;
    let user = database.userModel.findById(req.user.id);
    user.reminders.find(function (reminder) {
      if(reminder.id == reminderToUpdate) {
        reminder.title =  req.body.title,
        reminder.description =  req.body.description,
        reminder.completed = (req.body.completed === "true")
      }
    })
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    let reminderToDelete = req.params.id;
    database.cindy.reminders.find(function (reminder) {
      if (reminder.id == reminderToDelete) {
        database.cindy.reminders.splice(reminder, 1);
      }
    })
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
