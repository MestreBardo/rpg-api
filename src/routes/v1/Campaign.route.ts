import { Router } from 'express';
import { ValidationSource } from '../../common/enums/ValidationSource.enum';
import { JwtValidator } from '../../common/validators/Auth/Jwt.joi';
import { CampaignCreateValidator } from '../../common/validators/Campaign/CampaignCreate.joi';
import { CampaignIdValidator } from '../../common/validators/Campaign/CampaignId.joi';
import { CampaignUpdateNameValidator } from '../../common/validators/Campaign/CampaignUpdateName.joi';
import { CampaignUpdateValidator } from '../../common/validators/Campaign/CampaignUpdate.joi';
import { CampaignCheckRole } from '../../core/handles/Campaign/CampaignCheckRole.handle';
import { CampaignCreate } from '../../core/handles/Campaign/CampaignCreate.handle';
import { CampaignDuplicity } from '../../core/handles/Campaign/CampaignDuplicity.handle';
import { CampaignFind } from '../../core/handles/Campaign/CampaignFind.handle';
import { CampaignLeave } from '../../core/handles/Campaign/CampaignLeave.handle';
import { CampaignPatchName } from '../../core/handles/Campaign/CampaignPatchName.handle';
import { CampaignPut } from '../../core/handles/Campaign/CampaignPut.handle';
import { GroupFind } from '../../core/handles/Group/GroupFind.handle';
import { JwtVerification } from '../../core/handles/Jwt/JwtVerification.handle';
import { UserTokenFind } from '../../core/handles/User/UserTokenFind.handle';
import { Validator } from '../../helpers/Validator';

class CampaignRoute {
    static create() {
        const router = Router();
        router.use(
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            JwtVerification.handle,
        )
        router.post(
            "",
            Validator.validate(
                CampaignCreateValidator.schema
            ),
            UserTokenFind.handle,
            GroupFind.handle(
                ValidationSource.BODY
            ),
            CampaignDuplicity.handle,
            CampaignCreate.handle
        );

        router.patch(
            "/:campaignId/name",
            Validator.validate(
                CampaignUpdateNameValidator.schema
            ),
            Validator.validate(
                CampaignIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            CampaignCheckRole.handle(
                ["master"]
            ),
            CampaignDuplicity.handle,
            CampaignFind.handle(
                ValidationSource.PARAMS
            ),
            CampaignPatchName.handle
        );

        router.put(
            "/:campaignId",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            JwtVerification.handle,
            Validator.validate(
                CampaignUpdateValidator.schema
            ),
            Validator.validate(
                CampaignIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserTokenFind.handle,
            CampaignCheckRole.handle(
                ["master"]
            ),
            CampaignFind.handle(
                ValidationSource.PARAMS
            ),
            CampaignPut.handle
        );


        router.delete(
            "/:campaignId/leave",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                CampaignIdValidator.schema
            ),
            Validator.validate(
                CampaignIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            CampaignCheckRole.handle(
                ["player"]
            ),
            CampaignLeave.handle
        );

        


        return router;
    }
}

export {
    CampaignRoute
}