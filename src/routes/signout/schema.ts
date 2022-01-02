export interface SignoutRequest extends Express.Request {
  cookies: {
    refresh_token: string;
  };
}
