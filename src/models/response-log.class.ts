export class ResponseLog {
  constructor(
    public method: string,
    public pathname: string,
    public statusCode: number,
    public message: string,
  ) { }
}
