WeightRecords = new Meteor.Collection("weightRecords");

WeightRecords.allow({
  insert: function (userId, record) {
    console.log("server log: " + JSON.stringify(record));
    return record.creator == "oded"; 
  }
});

if (Meteor.isClient) {
  var myRecords, currentWeight;
  function buildChartData(data){
    for(var i = 0 ; i < data.length ; i++){

    }
  }

  // Meteor.startup(function() {
//    myRecords = WeightRecords.find({creator: Meteor.userId()}, {sort: {time: -1}}).fetch();
  // });
  userLogin = function() {
    Accounts._loginButtonsSession.set("inSignupFlow", true);
  };

  Template.main.events({
      "click input": function (e) {
          WeightRecords.insert({
              weight: parseFloat( $("#weightInput").val() ),
              creator: "oded", //Meteor.userId(),
              time: new Date
          })
      }
  });

function init(){
  if(myRecords == undefined){
    myRecords = WeightRecords.find( {creator: "oded"}, {sort: {time: -1}}).fetch();
    currentWeight = myRecords && myRecords.length ? myRecords[0].weight : 4;
  }
  //$("#page1").trigger("create");

}

  Template.main.min =  function () {
    init();
    return currentWeight - 4;
  };
  Template.main.max =  function () {
    init();
    return currentWeight + 4;
  };
  Template.main.weight =  function () {
    init();
    return currentWeight;
  };
}
/*
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
*/

if (Meteor.isServer) {
  Meteor.startup(function () {
    WeightRecords.insert({weight: 97.8, creator: "oded" , time : new Date},function(err, id){
      console.log("precreated a record for oded: " + id);
    });
  });
}


