import { NextFunction, Request, Response } from "express";
import passport from "passport";

/**
 * @api {post} /auth/login
 * @apiName Login.
 * @apiPermission anyone
 * @apiGroup anyone
 *
 * // TODO: update apiParams
 * @apiParam {string} [email] E-mail
 * @apiParam {string} [password] Password
 *
 * @apiSuccess (200) {Object} { success: true }
 * @apiFail (500) {Object} { success: false }
 */
export async function LoginPostHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    passport.authenticate("local", (err, user) => {
        // Authentication failed, redirect and let the client know with a url parameter.
        if (!user) {
            return res.redirect("/auth/login?loginError");
        }

        if (err) {
            return res.status(500).json({ error: "internal server error" });
        }
        req.login(user, () => {
            if (err) {
                return res.status(500).json({ error: "internal server error" });
            }

            // I encountered a strange bug which wouldn't mark the user as logged in in certain cases... nextTick fixed it.
            process.nextTick(() => {
                return res.redirect("/book");
            });
        });
    })(req, res, next);
}
