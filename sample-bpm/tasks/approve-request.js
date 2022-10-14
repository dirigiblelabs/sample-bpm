const process = require("bpm/v4/process");
let mailClient = require("mail/v4/client");
let config = require("core/v4/configurations");

let execution = process.getExecutionContext();
let executionId = execution.getId();

let user = process.getVariable(executionId, "user");

console.log(`Time Entry Request Approved for User [${user}]`);

if (isMailConfigured()) {
    console.error("Missing mail configuration");
} else {
    let from = config.get("APP_SAMPLE_BPM_FROM_EMAIL");
    let to = config.get("APP_SAMPLE_BPM_TO_EMAIL");
    let subject = "Time Entry Request - Approved";
    let content = `<h1>Status:</h1><br><p>Time Entry Request for [${user}] - Approved</p>`;
    let subType = "html";

    mailClient.send(from, to, subject, content, subType);
}

function isMailConfigured() {
    return config.get("DIRIGIBLE_MAIL_USERNAME") != ""
        && config.get("DIRIGIBLE_MAIL_PASSWORD") != ""
        && config.get("DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL") != ""
        && config.get("DIRIGIBLE_MAIL_SMTPS_HOST") != ""
        && config.get("DIRIGIBLE_MAIL_SMTPS_PORT") != ""
        && config.get("APP_SAMPLE_BPM_FROM_EMAIL") != ""
        && config.get("APP_SAMPLE_BPM_TO_EMAIL") != ""
}