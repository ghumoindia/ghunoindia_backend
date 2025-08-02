const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const adminAuthRoutes = require("./routes/admin/admin.routes");
const stateRoutes = require("./routes/admin/state.routes");
const cities = require("./routes/admin/cities.routes");
const places = require("./routes/admin/places.routes");
const foods = require("./routes/admin/foods.routes");
const activityRoutes = require("./routes/admin/activity.routes");
const stateListRoutes = require("./routes/user/stateList.routes");
const placesListRoutes = require("./routes/user/placesList.routes");
const foodsListRoutes = require("./routes/user/foodList.routes");
const citiesListRoutes = require("./routes/user/citiesList.routes");
const hotelsRoutes = require("./routes/admin/hotels.routes");
const hotelsListRoutes = require("./routes/user/hotels.routes");
const activityListRoutes = require("./routes/user/activities.routes");

const { adminUrl, userUrl } = require("./constant");
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads/images")));

// adminRoutes
app.use(`${adminUrl}/auth`, adminAuthRoutes);
app.use(`${adminUrl}/state`, stateRoutes);
app.use(`${adminUrl}/cities`, cities);
app.use(`${adminUrl}/places`, places);
app.use(`${adminUrl}/foods`, foods);
app.use(`${adminUrl}/activity`, activityRoutes);
app.use(`${adminUrl}/hotels`, hotelsRoutes);

//user Routes
app.use(`${userUrl}/state`, stateListRoutes);
app.use(`${userUrl}/places`, placesListRoutes);
app.use(`${userUrl}/foods`, foodsListRoutes);
app.use(`${userUrl}/cities`, citiesListRoutes);
app.use(`${userUrl}/hotels`, hotelsListRoutes);
app.use(`${userUrl}/activity`, activityListRoutes);

module.exports = app;
