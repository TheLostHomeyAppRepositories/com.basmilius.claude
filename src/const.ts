export const SETTING_API_KEY = 'claude-api-key';
export const SETTING_CUSTOM_INSTRUCTIONS = 'claude-custom-instructions';
export const SETTING_DEFAULT_EFFORT = 'claude-default-effort';
export const SETTING_DEFAULT_MODEL = 'claude-default-model';
export const SETTING_DEFAULT_SYSTEM_PROMPT = 'claude-default-system-prompt';
export const SETTING_MAX_TOKENS = 'claude-max-tokens';
export const SETTING_SCHEDULED_COMMANDS = 'claude-scheduled-commands';
export const SETTING_SKILLS = 'claude-skills';

export const SETTING_HOMEY_MCP_CLIENT_ID = 'homey-mcp-client-id';
export const SETTING_HOMEY_MCP_CLIENT_SECRET = 'homey-mcp-client-secret';
export const SETTING_HOMEY_MCP_ACCESS_TOKEN = 'homey-mcp-access-token';
export const SETTING_HOMEY_MCP_REFRESH_TOKEN = 'homey-mcp-refresh-token';
export const SETTING_HOMEY_MCP_TOKEN_EXPIRES_AT = 'homey-mcp-token-expires-at';

export const HOMEY_MCP_SERVER_URL = 'https://mcp.athom.com';
export const HOMEY_MCP_AUTH_ENDPOINT = 'https://mcp.athom.com/oauth2/authorise';
export const HOMEY_MCP_TOKEN_ENDPOINT = 'https://mcp.athom.com/oauth2/token';
export const HOMEY_MCP_REGISTER_ENDPOINT = 'https://mcp.athom.com/oauth2/client';

export const DEFAULT_MODEL = 'claude-sonnet-5-5';
export const DEFAULT_EFFORT = 'medium';
export const DEFAULT_MAX_TOKENS = 4096;

/**
 * The model behind the settings page: the connection test and the system prompt generator.
 */
export const UTILITY_MODEL = 'claude-haiku-5-5';

export const MAX_SERVER_TOOL_TURNS = 8;
export const MAX_SKILL_NAME_LENGTH = 64;
export const MAX_SKILL_DESCRIPTION_LENGTH = 1024;
export const MAX_WEB_CONTENT_TOKENS = 25_000;
export const MAX_WEB_FETCHES = 5;
export const MAX_WEB_SEARCHES = 5;

export type Effort = 'low' | 'medium' | 'high' | 'xhigh' | 'max';

const ALL_EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'] as const;

/**
 * `filtersWebResults` marks the models that run the web tools from inside code execution,
 * which strips irrelevant content before it reaches the context window. Claude 4.6 and up
 * support this; older models only accept the basic tool versions.
 *
 * `efforts` lists the effort levels a model accepts. Models without any ignore `effort`,
 * because they reject the parameter.
 */
export const MODELS = [
    {id: 'claude-fable-5-2', name: 'Claude Fable 5.2', filtersWebResults: false, efforts: ALL_EFFORTS},
    {id: 'claude-opus-5-5', name: 'Claude Opus 5.5', filtersWebResults: true, efforts: ALL_EFFORTS},
    {id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', filtersWebResults: true, efforts: ALL_EFFORTS},
    {id: 'claude-haiku-5-5', name: 'Claude Haiku 5.5', filtersWebResults: false, efforts: ALL_EFFORTS},
    {id: 'claude-fable-5-1', name: 'Claude Fable 5.1 (legacy)', filtersWebResults: false, efforts: ALL_EFFORTS},
    {id: 'claude-opus-5', name: 'Claude Opus 5', filtersWebResults: true, efforts: ALL_EFFORTS},
    {id: 'claude-sonnet-5', name: 'Claude Sonnet 5', filtersWebResults: true, efforts: ALL_EFFORTS},
    {id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', filtersWebResults: false, efforts: []}
] as const;

/**
 * Models that left the list, with the model that takes their place. A saved setting or Flow
 * that still names one of them runs on the replacement.
 */
const REPLACED_MODELS: Readonly<Record<string, string>> = {
    'claude-opus-4-6': 'claude-opus-5-5',
    'claude-sonnet-4-6': 'claude-sonnet-5-5'
};

export function replaceRemovedModel(model: string): string {
    return REPLACED_MODELS[model] ?? model;
}
