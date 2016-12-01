"use strict";
// load the things we need
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

// define the schema for our openid connect provider model
const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    opUrls: {
        type: String,
        required: true
    },
    keys: {
        type: String,
        required: true
    },
    trustMarks: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    client_secret: {
        type: String,
        required: true
    },
    response_type: {
        type: String,
        required: true
    },
    redirect_uri: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },  
    state: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    error: {
        type: String,
        required: true
    },
    error_description: {
        type: String,
        required: true
    },
    error_uri: {
        type: String,
        required: true
    },
    grant_type: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    token_type: {
        type: String,
        required: true
    },
    expires_in: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    refresh_token: {
        type: String,
        required: true
    },
    nonce: {
        type: String,
        required: true
    },
    display: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    acr_values: {
        type: String,
        required: true
    },                 
    createdOn: {
        type: Date,
        default: new Date()
    }
});

// create the model for openid connect provider and expose it to our app
module.exports = mongoose.model('Provider', providerSchema);
