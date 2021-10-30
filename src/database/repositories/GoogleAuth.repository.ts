import { Source } from '../../common/constants/Source.enum';
import { google } from 'googleapis';
import { External } from '../../common/entities/External.entity';
import { GoogleConstants } from "../../common/constants/Google.constants"

class GoogleAuthRepository {
    static async findOne(googleCode: string) {
        const redirectURI = GoogleConstants.redirectUri;
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `http://localhost:4000${redirectURI}`
        );
        const {tokens} = await oauth2Client.getToken(googleCode);
        oauth2Client.setCredentials(tokens);
        var oauth2 = google.oauth2({
            auth: oauth2Client,
            version: GoogleConstants.version
        });
        const response = await oauth2.userinfo.get()
        const { id: googleId, email, name, picture } = response.data;
        return {
            email,
            name,
            picture,
            external: new External(googleId, Source.google)
        }
         

    }
}

export {
    GoogleAuthRepository
}