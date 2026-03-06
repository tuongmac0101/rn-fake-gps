export interface IPasswordLoginReq {
  username: string;
  password: string;
}

export interface IAuthRes {
  access_token: string;
  refresh_token: string;
}
