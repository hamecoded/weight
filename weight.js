// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Records = new Meteor.Collection("records");

if (Meteor.isClient) {

  var myRecords = Records.find({}).fetch();
  var latestRecord = Records.findOne({}, {sort: {date: 1}});


  Template.weight.players = function () {
    return 
  };

  Template.weight.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.record.events({
    'click a.weight': function () {
      //Players.update(Session.get("selected_player"), {$inc: {weight: 1}});


    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    /*if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++)
        t({name: names[i], weight: Math.floor(Random.fraction()*10)*5});
    }*/
  });
}
