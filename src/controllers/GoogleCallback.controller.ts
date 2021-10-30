import { Request, Response } from "express";
import { google } from 'googleapis';

export class GoogleCallbackController {
    async handle(req: Request, res: Response) {
        const redirectURI = "/auth/google"
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `http://localhost:4000${redirectURI}`
          );
          
          // generate a url that asks permissions for Blogger and Google Calendar scopes
          const scopes = [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
          ];
          
          const url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
          
            // If you only need one scope you can pass it as a string
            scope: scopes
          });
        res.send(url);
    }
}