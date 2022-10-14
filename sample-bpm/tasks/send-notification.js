const process = require("bpm/v4/process");
const base64 = require("utils/v4/base64");

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

let url = `http://localhost:8080/services/v4/web/sample-bpm/process/?data=${urlEncodedData}`;

console.log(`Approve Request URL: ${url}`);

// TODO: Send mail