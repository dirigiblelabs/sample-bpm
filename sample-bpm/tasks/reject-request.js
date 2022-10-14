const process = require("bpm/v4/process");

let execution = process.getExecutionContext();
let executionId = execution.getId();

let user = process.getVariable(executionId, "user");

console.error(`Time Entry Request Rejected for User [${user}]`);