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
    let reminderToFind = req.params.id
    let user = database.userModel.findById(req.user.id);
    let searchResult = user.reminders.find(reminder => reminder.id == reminderToFind)
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    }
  },

  create: (req, res) => {
    let user = database.userModel.findById(req.user.id);
    let reminder = {
      id: user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    
    user.reminders.push(reminder);
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
    let user = database.userModel.findById(req.user.id);
    let reminderToDelete = req.params.id;
    user.reminders.find(function (reminder) {
      if (reminder.id == reminderToDelete) {
        user.reminders.splice(reminder, 1);
      }
    })
    res.redirect("/reminders")
  },
};

module.exports = remindersController;
