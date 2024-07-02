import { configurations as config } from "sdk/core";
import { client as mailClient } from "sdk/mail";
import { process } from "sdk/bpm"

const execution = process.getExecutionContext();
const executionId = execution.getId();

const requester = process.getVariable(executionId, "requester");

// Uncomment this code if you want to test built-in retries and the retrigger action
// if (process.getVariable(executionId, "IMPORTANT_PARAM") === null) {
//     throw new Error('Very important parameter is missing !!!');
// }

let from = config.get("APP_SAMPLE_BPM_FROM_EMAIL");
let to = config.get("APP_SAMPLE_BPM_TO_EMAIL");
let subject = "Time Entry Request - Pending";
let content = `<h2>Status:</h2><h4>A new Time Entry Request for [${requester}] - Pending</h4>Open the inbox <a href="http://localhost:8080/services/web/inbox/" target="_blank">here</a> to process the request.`;
let subType = "html";

if (isMailConfigured()) {
    mailClient.send(from, to, subject, content, subType);
} else {
    console.log(`Mail will not be send because the mail client is not configured.\nMail:\n\tsubject: ${subject}\n\tcontent: ${content}`);
}

function isMailConfigured() {
    return config.get("DIRIGIBLE_MAIL_USERNAME") &&
        config.get("DIRIGIBLE_MAIL_PASSWORD") &&
        config.get("DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL") &&
        (
            (config.get("DIRIGIBLE_MAIL_SMTPS_HOST") && config.get("DIRIGIBLE_MAIL_SMTPS_PORT") && config.get("DIRIGIBLE_MAIL_SMTPS_PORT"))
            ||
            (config.get("DIRIGIBLE_MAIL_SMTP_HOST") && config.get("DIRIGIBLE_MAIL_SMTP_PORT") && config.get("DIRIGIBLE_MAIL_SMTP_AUTH"))
        );
}