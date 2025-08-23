const allowedRoles = ["super-admin", "content-manager", "admin"];
const adminUrl = "/admin/v1";
const userUrl = "/user/v1";

const Core_config = {
  credentials: true,
};

module.exports = {
  allowedRoles,
  adminUrl,
  userUrl,
  Core_config,
};
