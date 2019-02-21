import { Meteor } from 'meteor/meteor';
import Discounts from '../common/discountData';
import { PromoCodes } from '../common/collections_2';
import WorkData from '../common/collections_2';

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

Discounts.allow({
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

PromoCodes.allow({
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
})

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
