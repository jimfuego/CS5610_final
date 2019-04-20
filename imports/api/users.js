import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { Accounts } from "meteor/accounts-base";

export const Users = new Mongo.Collection("user");

if (Meteor.isServer) {
  Meteor.publish("user", () => {
    return (Users.findOne({ userName : Meteor.user().userName }, { _id: 0, userName: 0}));
  });
}

// // gets history
// Meteor.methods({
//     "user.getHistory"(){
//         return Users.findOne({ userName : Meteor.user().userName }, { _id: 0, userName: 0});
//     }
// });

// gets history
Meteor.methods({
    "user.addHistory"(term) {
        if (!Meteor.user()) {
            return;
        }
        let query = Users.findOne({user: Meteor.user().userName});
        if (query === undefined) {
            Users.insert({
                userName: Meteor.user().userName,
                history: []
            })
        }
        Users.update( Meteor.user().userName,
            { $addToSet: {
                history: term
             }
        });
    }
});




