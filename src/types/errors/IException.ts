import { formatarStringDate } from "@/utils/format";

export class IException extends Error {
	private args: string[];
	private date: string;
	private path: string | URL;
	private status: number;

	constructor(
		args: string[],
		message: string,
		path: string | URL,
		status: number,
		date?: string,
	) {
		super(message);
		this.args = args;
		this.date = date || formatarStringDate(new Date());
		this.path = path;
		this.status = status;

		Object.setPrototypeOf(this, IException.prototype);
	}

	public getArgs(): string[] {
		return this.args;
	}

	public setArgs(args: string[]): void {
		this.args = args;
	}

	public getDate(): string {
		return this.date;
	}

	public setDate(date: string): void {
		this.date = date;
	}

	public getMessage(): string {
		return this.message;
	}

	public setMessage(message: string): void {
		this.message = message;
	}

	public getPath(): string | URL {
		return this.path;
	}

	public setPath(path: string | URL): void {
		this.path = path;
	}

	public getStatus(): number {
		return this.status;
	}

	public setStatus(status: number): void {
		this.status = status;
	}
}
