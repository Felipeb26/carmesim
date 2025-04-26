export interface APiPage {
	page: number;
	size: number;
	customHeaders?: CustomHeaders;
}

export type CustomHeaders = Record<string, string | Next>;

interface Next {
	revalidade?: number;
	tags?: string[];
}
