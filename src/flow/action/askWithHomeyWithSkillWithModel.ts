import { action, FlowActionEntity } from '@basmilius/homey-common';
import type { ClaudeApp } from '../../types';
import { AutocompleteProviders } from '..';

/**
 * Action: Ask Claude a question with access to Homey via MCP and one of the configured skills
 * loaded, using a specific model chosen per flow card.
 */
@action('ask_with_homey_with_skill_with_model')
export default class extends FlowActionEntity<ClaudeApp, Args, never, Result> {
    async onInit(): Promise<void> {
        this.registerAutocomplete('skill', AutocompleteProviders.Skill);

        await super.onInit();
    }

    async onRun(args: Args): Promise<Result> {
        const skill = this.app.brain.skills.require(args.skill.id);
        const server = await this.app.brain.homeyMcp.getServer();

        const {answer, model} = await this.app.brain.claude.askWithMcpServersAndSkills(
            args.question,
            [server],
            [skill],
            undefined,
            args.model,
            undefined,
            args.effort
        );

        await this.app.triggerResponseReady(answer, model);

        return {answer, model_used: model};
    }
}

type Args = {
    readonly question: string;
    readonly skill: {
        readonly id: string;
    };
    readonly model: string;
    readonly effort?: string;
};

type Result = {
    readonly answer: string;
    readonly model_used: string;
};
