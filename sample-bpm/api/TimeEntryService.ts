import { Controller, Post, Put, Get, response } from "sdk/http"
import { user } from "sdk/security";
import { process, tasks } from "sdk/bpm"

@Controller
class TimeEntryService {

    @Post("/requests")
    public submitRequest(data: any) {

        process.start('time-entry-request', {
            "requester": user.getName(),
            "project": data.project,
            "startDate": data.startDate,
            "endDate": data.endDate,
            "hours": data.hours
        });

        response.setStatus(response.ACCEPTED);
    }

    @Put("/requests/:id/approve")
    public approveRequest(data: any, ctx: any) {
        const taskId = ctx.pathParameters.id;
        const reason = data.reason;
        this.completeTask(taskId, true, reason);
    }

    @Put("/requests/:id/reject")
    public rejectRequest(data: any, ctx: any) {
        const taskId = ctx.pathParameters.id;
        const reason = data.reason;
        this.completeTask(taskId, false, reason);
    }

    private completeTask(taskId: string, approved: boolean, reason: string) {
        const variables = {
            approver: user.getName(),
            reason: reason,
            requestApproved: approved
        };
        tasks.complete(taskId, variables);
    }

    @Get("/requests/:id/details")
    public getRequestDetails(_: any, ctx: any) {
        const taskId = ctx.pathParameters.id;
        const variables = tasks.getVariables(taskId);
        return variables;
    }
}
