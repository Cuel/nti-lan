import { Configuration } from "@config";
import { app } from "../Index";
import { Logger } from "../Utilities/Logger";
import { AdminBookingsGetHandler } from "./admin/bookings";
import { AdminGenerateSheetsGetHandler } from "./admin/generateSheet";
// import { RawAdminBookingsGetHandler } from "./admin/rawBookings";
import { BookPostHandler } from "./api/v1/bookings/book";
import { BookingPaidPostHandler } from "./api/v1/bookings/paid";
import { BookingRemovePostHandler } from "./api/v1/bookings/remove";
import { EmailVerifyGetHandler } from "./api/v1/email/verify";
import { LoginGetHandler } from "./auth/login/get";
import { LoginPostHandler } from "./auth/login/post";
import { LogoutGetHandler } from "./auth/logout/get";
import { SignupGetHandler } from "./auth/signup/get";
import { SignupPostHandler } from "./auth/signup/post";
import { VerifyGetHandler } from "./auth/verify/get";
import { VerifyPostHandler } from "./auth/verify/post";
import { BookGetHandler } from "./book/get";
import { IndexHandler } from "./Index.controller";
import { UserBookingsGetHandler } from "./user/bookings";

export function BindControllers() {
    Logger.info("Binding controllers.");

    app.get("/", IndexHandler);

    app.get("/auth/login", LoginGetHandler);
    app.post("/auth/login", LoginPostHandler);

    app.get("/book", BookGetHandler);
    app.post("/api/v1/bookings/book", BookPostHandler);

    app.post("/auth/signup", SignupPostHandler);
    app.get("/auth/signup", SignupGetHandler);

    app.get("/auth/logout", LogoutGetHandler);

    app.get("/admin/bookings", AdminBookingsGetHandler);
    app.get("/user/bookings", UserBookingsGetHandler);

    // app.get("/admin/rawbookings", RawAdminBookingsGetHandler);

    app.post("/api/v1/bookings/remove", BookingRemovePostHandler);
    app.post("/api/v1/bookings/paid", BookingPaidPostHandler);

    app.get("/api/v1/email/verify", EmailVerifyGetHandler);

    app.get("/auth/verify", VerifyGetHandler);
    app.post("/auth/verify", VerifyPostHandler);


    app.get("/admin/generateSheets", AdminGenerateSheetsGetHandler);

    // app.use(E404Handler);
    app.use((err, req, res, next) => {
        if (err) {
            return res.render("error", {
                path: req.path,
                title: Configuration.Web.Site.Title,
                isAdmin: req.user ? req.user.AccessLevel === "admin" : false,
                isLoggedIn: req.user ? true : false,
                error: err.message
            });
        }
    });
}
