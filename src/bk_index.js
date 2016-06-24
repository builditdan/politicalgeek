/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Political Geek for a fact about our government"
 *  Alexa: "Here's your government fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.ec7c178b-b1b7-43a4-b488-1c9cb3db2c46";

/**
 * Array containing government facts.
 */
var GOVERNMENT_FACTS = [
    "This United States Government, is divided into three parts, or branches: the legislative branch, the executive branch, and the judicial branch. Each branch has a different duty, but all three branches must work together.",
    "The legislative branch, is in charge of making laws.",
    "The executive branch of our Government, is in charge of making sure that the laws of the United States are obeyed."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * PoliticalGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var PoliticalGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PoliticalGeek.prototype = Object.create(AlexaSkill.prototype);
PoliticalGeek.prototype.constructor = PoliticalGeek;

PoliticalGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("PoliticalGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

PoliticalGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("PoliticalGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
PoliticalGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("PoliticalGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

PoliticalGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Political Geek tell me a government fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random government fact from the government facts list
    var factIndex = Math.floor(Math.random() * GOVERNMENT_FACTS.length);
    var fact = GOVERNMENT_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your government fact: " + fact;

    response.tellWithCard(speechOutput, "PoliticalGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the PoliticalGeek skill.
    var politicalGeek = new PoliticalGeek();
    politicalGeek.execute(event, context);
};
