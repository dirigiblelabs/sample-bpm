const process = require("bpm/v4/process");

let execution = process.getExecutionContext();
let executionId = execution.getId();

let user = process.getVariable(executionId, "user");

console.log(`Time Entry Request Approved for User [${user}]`);