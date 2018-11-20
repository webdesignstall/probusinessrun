import {Meteor} from 'meteor/meteor';

WorkData.allow({
    insert(userId, doc) {
        // The user must be logged in and the document must be owned by the user.
        return userId === userId;
    },
    update(userId, doc) {
        return userId === userId;
    },
    remove(userId, doc) {
        return userId === userId;
    }
});

Meteor.users.allow({
    insert(userId, doc) {
        // The user must be logged in and the document must be owned by the user.
        return userId === userId;
    },
    update(userId, doc) {
        return userId === userId;
    },
    remove(userId, doc) {
        return userId === userId;
    }
});
