import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
    Meteor.methods({
        "wiki.getWiki"(queryTerm) {
            let wikipedia = require("node-wikipedia");
            return new Promise((resolve, reject) => {
                wikipedia.page.data(queryTerm, {content: true}, resolve);
            });
        }
    });
}