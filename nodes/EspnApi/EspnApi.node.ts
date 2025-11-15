import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

function getSportPath(resource: string): string {
	const sportPaths: { [key: string]: string } = {
		nfl: 'football/nfl',
		nba: 'basketball/nba',
		mlb: 'baseball/mlb',
		nhl: 'hockey/nhl',
		collegefootball: 'football/college-football',
		collegebasketball: 'basketball/mens-college-basketball',
	};

	return sportPaths[resource] || resource;
}

export class EspnApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ESPN API',
		name: 'espnApi',
		icon: 'file:espn.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume ESPN Public API for sports data',
		defaults: {
			name: 'ESPN API',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'NFL',
						value: 'nfl',
					},
					{
						name: 'NBA',
						value: 'nba',
					},
					{
						name: 'MLB',
						value: 'mlb',
					},
					{
						name: 'NHL',
						value: 'nhl',
					},
					{
						name: 'Soccer',
						value: 'soccer',
					},
					{
						name: 'College Football',
						value: 'collegefootball',
					},
					{
						name: 'College Basketball',
						value: 'collegebasketball',
					},
				],
				default: 'nfl',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Scoreboard',
						value: 'scoreboard',
						description: 'Get scoreboard for a specific date',
						action: 'Get scoreboard',
					},
					{
						name: 'Get Teams',
						value: 'teams',
						description: 'Get list of teams',
						action: 'Get teams',
					},
					{
						name: 'Get Team',
						value: 'team',
						description: 'Get details of a specific team',
						action: 'Get team details',
					},
					{
						name: 'Get Standings',
						value: 'standings',
						description: 'Get league standings',
						action: 'Get standings',
					},
					{
						name: 'Get Athletes',
						value: 'athletes',
						description: 'Get list of athletes',
						action: 'Get athletes',
					},
					{
						name: 'Get Athlete',
						value: 'athlete',
						description: 'Get details of a specific athlete',
						action: 'Get athlete details',
					},
					{
						name: 'Get News',
						value: 'news',
						description: 'Get latest news',
						action: 'Get news',
					},
				],
				default: 'scoreboard',
			},
			// Scoreboard options
			{
				displayName: 'Date',
				name: 'date',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['scoreboard'],
					},
				},
				default: '',
				placeholder: '20240115',
				description: 'Date in YYYYMMDD format. Leave empty for today.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['scoreboard'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			// Team options
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['team'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the team',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['teams'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			// Athlete options
			{
				displayName: 'Athlete ID',
				name: 'athleteId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['athlete'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the athlete',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['athletes'],
					},
				},
				default: 50,
				description: 'Max number of results to return',
			},
			// Standings options
			{
				displayName: 'Season',
				name: 'season',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['standings'],
					},
				},
				default: '',
				placeholder: '2024',
				description: 'Season year. Leave empty for current season.',
			},
			// News options
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['news'],
					},
				},
				default: 20,
				description: 'Max number of results to return',
			},
			// Soccer league options
			{
				displayName: 'League',
				name: 'soccerLeague',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['soccer'],
					},
				},
				options: [
					{
						name: 'English Premier League',
						value: 'eng.1',
					},
					{
						name: 'La Liga',
						value: 'esp.1',
					},
					{
						name: 'Bundesliga',
						value: 'ger.1',
					},
					{
						name: 'Serie A',
						value: 'ita.1',
					},
					{
						name: 'Ligue 1',
						value: 'fra.1',
					},
					{
						name: 'MLS',
						value: 'usa.1',
					},
					{
						name: 'UEFA Champions League',
						value: 'uefa.champions',
					},
				],
				default: 'eng.1',
				description: 'Soccer league to query',
			},
			// Additional options
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				options: [
					{
						displayName: 'Week',
						name: 'week',
						type: 'number',
						default: 1,
						description: 'Week number (for NFL/College Football)',
					},
					{
						displayName: 'Groups',
						name: 'groups',
						type: 'string',
						default: '',
						description: 'Filter by groups (comma-separated)',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				const qs: IDataObject = {};

				// Build API endpoint based on resource and operation
				if (operation === 'scoreboard') {
					const date = this.getNodeParameter('date', i, '') as string;
					const limit = this.getNodeParameter('limit', i, 50) as number;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/scoreboard`;
					}

					if (date) {
						qs.dates = date;
					}
					qs.limit = limit;
				} else if (operation === 'teams') {
					const limit = this.getNodeParameter('limit', i, 50) as number;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/teams`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/teams`;
					}

					qs.limit = limit;
				} else if (operation === 'team') {
					const teamId = this.getNodeParameter('teamId', i) as string;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/teams/${teamId}`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/teams/${teamId}`;
					}
				} else if (operation === 'standings') {
					const season = this.getNodeParameter('season', i, '') as string;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/v2/sports/soccer/${league}/standings`;
					} else {
						endpoint = `https://site.api.espn.com/apis/v2/sports/${getSportPath(resource)}/standings`;
					}

					if (season) {
						qs.season = season;
					}
				} else if (operation === 'athletes') {
					const limit = this.getNodeParameter('limit', i, 50) as number;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/athletes`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/athletes`;
					}

					qs.limit = limit;
				} else if (operation === 'athlete') {
					const athleteId = this.getNodeParameter('athleteId', i) as string;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/athletes/${athleteId}`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/athletes/${athleteId}`;
					}
				} else if (operation === 'news') {
					const limit = this.getNodeParameter('limit', i, 20) as number;

					if (resource === 'soccer') {
						const league = this.getNodeParameter('soccerLeague', i) as string;
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/news`;
					} else {
						endpoint = `https://site.api.espn.com/apis/site/v2/sports/${getSportPath(resource)}/news`;
					}

					qs.limit = limit;
				}

				// Add additional fields
				const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
				if (additionalFields.week) {
					qs.week = additionalFields.week;
				}
				if (additionalFields.groups) {
					qs.groups = additionalFields.groups;
				}

				const responseData = await this.helpers.httpRequest({
					method: 'GET',
					url: endpoint,
					qs,
					json: true,
				});

				returnData.push(responseData as IDataObject);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ error: errorMessage });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
