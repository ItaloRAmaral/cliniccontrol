export interface AuthenticatePsychologistControllerResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  access_token: string;
}
