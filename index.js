const express = require("express");
const app = express();
const { create } = require("express-handlebars");
const projects = require("./projects.json");

const hbs = create({
    helpers: {
        addClass(currDir, projDir) {
            if (currDir === projDir) {
                return "current-directory";
            } else {
                return null;
            }
        },
        upperCase(text) {
            return text.toUpperCase();
        },
    },
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("./projects"));
app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.render("home", {
        projects,
    });
});

app.get("/projects/:eachProj", (req, res) => {
    const { eachProj } = req.params;
    const matchedProject = projects.find(item => item.directory === eachProj);
    const { name, directory, description, fullDescription, emoji } = matchedProject;

    !matchedProject ? 
    res.send("Page not found!", 404)
    :
    res.render("description-page", {
        projects,
        name,
        directory,
        description,
        fullDescription,
        emoji,
    });
});

app.listen(8080, () => console.log("Server listening..."));