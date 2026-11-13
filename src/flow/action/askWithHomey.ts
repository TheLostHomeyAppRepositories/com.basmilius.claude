import { action, FlowActionEntity } from '@basmilius/homey-common';
import type { ClaudeApp } from '../../types';

/**
 * Action: Ask Claude a question with access to Homey via MCP.
 */
@action('ask_with_homey')
export default class extends FlowActionEntity<ClaudeApp, Args, never, Result> {
    async onRun(args: Args): Promise<Result> {
        const server = await this.app.brain.homeyMcp.getServer();
        const {answer, model} = await this.app.brain.claude.askWithMcpServers(args.question, [server]);

        await this.app.triggerResponseReady(answer, model);

        return {answer, model_used: model};
    }
}

type Args = {
    readonly question: string;
};

type Result = {
    readonly answer: string;
    readonly model_used: string;
};
