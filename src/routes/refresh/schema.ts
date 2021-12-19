export interface RefreshRequest extends Express.Request {
  cookies: {
    refresh_token: string;
  };
}
