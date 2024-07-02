const process = require("bpm/process");
const base64 = require("utils/base64");
const mailClient = require("mail/client");
const config = require("core/configurations");

let execution = process.getExecutionContext();
let executionId = execution.getId();

let data = {
    executionId: executionId,
    User: process.getVariable(executionId, "User"),
    Project: process.getVariable(executionId, "Project"),
    Start: process.getVariable(executionId, "Start"),
    End: process.getVariable(executionId, "End"),
    Hours: process.getVariable(executionId, "Hours")
};

let urlEncodedData = base64.encode(JSON.stringify(data));

let url = `http://localhost:8080/services/web/sample-bpm/process/?data=${urlEncodedData}`;

console.log(`Approve Request URL: ${url}`);

/*
Uncomment this code if you want to test built-in retries and the retrigger action
if (process.getVariable(executionId, "IMPORTANT_PARAM") === null) {
    throw new Error('Very important parameter is missing !!!');
}
*/

if (isMailConfigured()) {
    let from = config.get("APP_SAMPLE_BPM_FROM_EMAIL");
    let to = config.get("APP_SAMPLE_BPM_TO_EMAIL");
    let subject = "Time Entry Request - Pending";
    let content = `<h2>Status:</h2><h4>Time Entry Request for [${data.User}] - Pending</h4>Click <a href="${url}" target="_blank">here</a> to process request.`;
    let subType = "html";

    mailClient.send(from, to, subject, content, subType);
} else {
    console.error("Missing mail configuration");
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