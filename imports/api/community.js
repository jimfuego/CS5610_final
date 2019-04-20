import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Community = new Mongo.Collection("community");

if (Meteor.isServer) {
  Meteor.publish("community", () => {
    return (Community.find({}));
  });
}

// gets history
Meteor.methods({
    "community.getHistory"(){
        return Community.find({});
    }
});

// gets history
Meteor.methods({
    "community.insert"(term) {
        if (!Meteor.user) {
            return new Meteor.Error("!user()");
        }
        Community.insert({
            history: term
        });
        console.log("community.insert ", term)
    }
});