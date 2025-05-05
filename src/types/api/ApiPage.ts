export interface APiPage<T = unknown> {
	page?: number;
	size?: number;
	data?: T;
	customHeaders?: CustomHeaders;
}

export type CustomHeaders = Record<string, string | Next>;

interface Next {
	revalidate?: number;
	tags?: string[];
}
