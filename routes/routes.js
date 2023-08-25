const { Router } = require("express");
const controller = require("../controllers/controllers");
const api = require("./api");
const { upload } = require("../utils/multer");
const auth = require("../controllers/auth_controller");

function router(passport) {
  const router = Router();

  // Default routes
  router.get("/", controller.control_index);
  router.get("/:page", controller.page_get);

  // Login routes
  router.get("/login", auth.checkNotLogged, controller.page_get);
  router.post("/login", auth.checkNotLogged, auth.login(passport));

  // Logout routes
  router.get("/register", auth.checkNotLogged, controller.page_get);
  router.post("/register", auth.register);

  router.post("/contact", controller.control_post_contact);
  router.post("/inschrijven", controller.control_post_inschrijven);

  // ADMIN
  router.get("/admin", controller.control_admin);
  router.get("/admin/:type", controller.control_admin_type);

  router.post(
    "/admin/media",
    upload.single("img"),
    controller.control_admin_media_post
  );

  // Add checklogged middleware function
  router.delete("/logout", auth.logout);

  /************************/
  /* (new) API Routes
/************************/
  // router.use("/api/v1", auth.checkLogged, api);
  router.use("/api/v1", api);

  return router;
}

module.exports = router;
