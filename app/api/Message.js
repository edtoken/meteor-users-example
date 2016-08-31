import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
	Meteor.methods({
		'messages.insert'(text) {

			check(text, String);

			let doc = {
				createdAt: new Date(),
				text: text,
				owner: this.userId
			};

			if (!doc.owner) {
				// todo check if user logged
				return;
			}

			Messages.insert(doc);
			return doc;
		}
	});

}