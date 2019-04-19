import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Achievements = new Mongo.Collection("achievements");

Meteor.methods({
    "wiki.getWiki"(queryTerm) {
        let wikipedia = require("wikipedia-js");
        let returnVal = new Promise((resolve, reject) => {
            wikipedia.page.data(this.state.query, {content: true}, resolve);
        });
    }
);