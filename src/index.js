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
  "The executive branch of our Government, is in charge of making sure that the laws of the United States are obeyed.",
  "The judicial branch, is in charge of deciding the meaning of laws, how to apply them to real situations, and whether a law breaks the rules of the Constitution.",
  "The President is the Commander-in-Chief of the Armed Forces, while Senators and Representatives are Members of Congress. They make decisions for the whole country by making or changing laws that affect everyone in the United States.",
  "In order to vote, you must be a U.S. citizen, who is at least 18 years old.",
  "The Constitution replaced the Articles of Confederation. The Constitution made a stronger Federal Government. It gave power to both the Federal Government and the state governments. This system is called federalism.",
  "The Liberty Bell was first made in 1752, for the Pennsylvania State House, now known as Independence Hall. It is a well-know symbol of our freedom.",
  "The first U.S. flag was designed in 1777 . It has 50 white stars on a blue background, with 13 white and red stripes that represent the 13 original colonies.",
  "The name “bald eagle” does not mean that this bird has no feathers. It comes from the word piebald, which refers to the eagle’s light and dark colored feathers.",
  "The Statue of Liberty was a gift from the people of France to the United States, and was named 'Liberty Enlightening the World.'",
  "The first version of the Pledge of Allegiance was written by Francis Bellamy in 1892, to mark the 400th anniversary of the arrival of the explorer, Christopher Columbus, in the Americas.",
  "The pledge of aleegence is as follows, 'I pledge aleegence to the Flag of the United States of America, and to the Republic for which it stands, one Nation under God, indivisible, with liberty and justice for all.'",
  "Florida has surpassed Minnesota as the state with the most active bald eagle nests in the lower 48. However, Alaska has the largest population of approximately 30,000.",
  "A glaring error in spelling, is on the Liberty Bell, where the N, and S, was left out of Pennsylvania. It was also misspelled in the U.S Constitution.",
  "The first Amendment is: 'Congress shall make no law. respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.'.",
  "The second Amendment is: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.'.",
  "The fifth Amendment is: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.'.",
  "To plead the fifth, is to refuse to testify, on the ground that the testimony might tend to incriminate yourself. It is based on the Fifth Amendment to the Constitution.",
  "Thanksgiving day was created, to give 'thanks', for the new Constitution.",
  "The Bill of Rights, are the first 10 amendments to the Constitution.",
  "A constitutional amendment, refers to the modification of the constitution of a nation or state.",
  "The Constitution prescribes that the Senate, be composed of two Senators from each State, giving us a total of 100 members.",
  "An elected Senator is in office for six years, whereas a Representative is in for 2 years.",
  "The United States Congress,  is a bicameral legislature, meaning  two chambers, of the federal government of the United States, consisting of two houses: the Senate and the House of Representatives.",
  "The U.S. House of Representatives currently contains 435 members, representing all 50 states. This number is reviewed for adjustments at each constitutionally, mandated Census, which is every 10 years.",
  "Currently, the  Method of Equal Proportions, is used to determine the number of Representatives at each census taking which occurs every 10 years.",
  "The Articles of the Constitution, establishes the branches of government, and what powers they have.",
  "In goverment, a bill is a proposal for a new law or a change to an existing one.",
  "The power of the President to refuse to approve a bill,  or a joint resolution, and thus prevent its enactment into law, is the veto.",
  "In the United States Congress, a joint resolution is a legislative measure or bill that requires approval by the Senate and the House, and is presented to the President, for his approval or disapproval.",
  "To pass a bill over the president's veto, requires a two-thirds vote, in each Chamber. That is the Senate and House.",
  "US Presidents have vetoed 1,484 bills, and Congress has overridden only - 106 of them.",
  "The record for the longest filibuster, goes to U.S. Senator Strom Thurmond, of South Carolina, who spoke for 24 hours and 18 minutes against the Civil Rights Act of 1957.",
  "In the middle of December, a new president and vice president of the United States are elected by the votes of only five hundred and thirty eight citizens, that is the 'electors' of the Electoral College System, and not the popular vote from the people.",
  "The longest-lived president, was Gerald Ford, who died at the age of 93 years of age.",
  "The oldest President serving our country, was Ronald Reagan. He was 69 years, 11 months, 14 days.",
  "The nation’s first president, George Washington, was the richest, worth $525 million in today’s dollars.",
  "President Harry S. Truman, may have been the poorest of all U.S. presidents. He was worth less than 1 million, in today’s dollars.",
  "Andrew Johnson and Bill Clinton, are the only two presidents to have been successfully impeached by the House of Representatives, and both were later acquitted by the Senate.",
  "On August 8, 1974, Nixon, avoided a Senate trial, leading to a possible conviction and impeachment by becoming the first president to resign.",
  "The speaker of the house is next in line for succession after the vice president.",
  "Conrad Heyer,  holds the distinction, of being the only man who was photographed, and served as a soldier under George Washington as he crossed the Delaware River.",
  "George Washington, crossed the Delaware River, on Christmas eve, 1776, during the American Revolutionary War. He launched a surprise attack against the Hessian forces, in Trenton, NJ., He did this to gain a quick victory in the war, and bolster the morale of the troops, and encourage others to join.",
  "The 'White House', was officially named by Teddy Roosevelt in 1901, and received that unique name after being painted all white, after the British army attempted to burn it down, during the War of 1812.",
  "Bipartisanship, is a political situation, especially in the context of a two-party system, in which opposing political parties find common ground, through compromise.",
  "The U.S. House of Representatives currently contains 435 members, representing all 50 states. This number is reviewed for adjustments at each constitutionally mandated Census.",
  "The Constitution currently has 27 amendments.",
  "Thomas Jefferson, wrote the Declaration of Independence, which was adopted on July 4, 1776.",
  "The Declaration of Independence announced our independence from Great Britain, and that the United States is free. ,,,Hip Hip Hooray!",
  "There are nine justices on the Supreme Court. The Chief Justice is John Roberts.",
  "All men must register for the Selective Service, starting at age eighteen, up to twenty-six.",
  "The second agreement, the Treaty of Alliance, made the fledgiling United States, and France allies against Great Britain in the Revolutionary War.",
  "President Jimmy Carter, known by some as the 'UFO President,' got his nickname by publicly claiming that he had a UFO sighting, prior to becoming president.",
  "Women were able to vote in America. when Congress passed a measure in 1920, which granted the following. “right of citizens of the United States to vote, shall not be denied, or abridged by the United States, or by any State on account of sex.'",
  "Many consider Great Britain's, Magna Carta of twelve fifteen, to be the predecessor to the U.S Constitution.",
  "World War II, was the largest war in number of countries involved, and the lives that were given.",
  "Majority and Minority leaders are elected by Senators, selected at the beginning of each Congress, by members of their respective party. One representing the leading party, while the other represents the minority. In other words, one Democrat and one Republican. Their primary role is to be the spokesperson for the Senate.",
  "The Assistant Majority and Minority Leaders of the United States Senate (commonly called Senate Majority and Minority Whips) are the second-ranking members of each party's leadership. The main function of the Majority and Minority Whips, is to gather votes on the major issues.",
  "In 1814, Francis Scott Key, wrote the lyrics to the Star Spangled Banner, while he was detained on a British ship in Baltimore."
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
        response.ask("You can ask Political Geek, tell me a government fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    var speechOutput = "Here's your government fact. " + fact;

    response.tellWithCard(speechOutput, "PoliticalGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the PoliticalGeek skill.
    var politicalGeek = new PoliticalGeek();
    politicalGeek.execute(event, context);
};
