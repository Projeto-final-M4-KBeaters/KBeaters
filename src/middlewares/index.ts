import ensureAuthMiddleware from "./ensureAuth.middleware";
import ensureAuthAdminMiddleware from "./ensureAuthIsAdm.middleware";
import ensureDataIsValidMiddleware from "./ensureDataIsValid.middleware";
import ensureAuthAdminOrSelfMiddleware from "./ensureAuthIsAdmOrSelf.middleware";
import ensureUserPatchSerializerMiddleware from "./ensureUserPatchSerializer.middleware";
import ensureEmailNotExistsMiddleware from "./ensureEmailNotExists.middleware";
import ensureBodyExistsMiddleware from "./ensureBodyExists.middleware";
import ensureUserIdIsValidMiddleware from "./ensureUserIdIsValid.middleware";
import ensureUserIsActiveMiddleware from "./ensureUserIsActive.middleware";
import ensureGenreNotExistMiddleware from "./ensureGenreNotExist.middleware";
import ensureExistsGenreMiddleware from "./ensureExistsGenres.middleware";
import ensureUUIDIsValidMiddleware from "./ensureUUIDIsValid.middleware";
import ensureMusicNameNotExistsMiddleware from "./ensureMusicNameNotExists.middleware";
import ensureAuthIsPerformerMiddleware from "./ensureAuthIsPerformer.middleware";
import ensureAuthIsAdmOrOwnerMiddleware from "./ensureAuthIsAdmOrOwner.middleware";
import ensureMusicIdIsValidMiddleware from "./ensureMusicsIdIsValid.middleware";

export {
    ensureDataIsValidMiddleware,
    ensureAuthMiddleware, 
    ensureAuthAdminMiddleware, 
    ensureAuthAdminOrSelfMiddleware,
    ensureUserPatchSerializerMiddleware,
    ensureEmailNotExistsMiddleware,
    ensureBodyExistsMiddleware,
    ensureUserIdIsValidMiddleware,
    ensureUserIsActiveMiddleware,
    ensureGenreNotExistMiddleware,
    ensureExistsGenreMiddleware,
    ensureUUIDIsValidMiddleware,
    ensureMusicNameNotExistsMiddleware,
    ensureAuthIsPerformerMiddleware,
    ensureAuthIsAdmOrOwnerMiddleware,
    ensureMusicIdIsValidMiddleware
};