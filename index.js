// Setting up

const express = require("express");
const app = express();

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

const s3 = require("./s3");
const config = require("./config");
const db = require("./utils/db");

// axios post commentUsername - for Modal
app.use(
    require("body-parser").urlencoded({
        extended: false
    })

    // require("body-parser").json; -- modal something
);

// Disk Storage

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

// Uploader

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// Serving files

app.use(express.static("./public"));

// Images Route

app.get("/images", function(req, res) {
    db.getRecentPictures()
        .then(results => {
            console.log(results.rows);
            res.json(results);
        })
        .catch(err => {
            console.log("Error in getRecentPictures: ", err);
        });
    // Images through Query
});

app.get("/images", function(req, res) {
    console.log(res);
});

// Upload Route

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("My Request in Index: ", req);

    // console.log(
    //     "Title: ",
    //     req.body.title,
    //     "Username: ",
    //     req.body.username,
    //     "Description: ",
    //     req.body.description,
    //     "Filename: ",
    //     req.file.filename
    // );

    let username = req.body.username;
    let title = req.body.title;
    let description = req.body.description;
    let url = config.s3Url + req.file.filename;

    db.insertPicture(url, username, title, description)
        .then(id => {
            console.log("My New ID in Database: ", id);
            db.getRecentPictures()
                .then(results => {
                    console.log(results.rows);
                    console.log("My new Results from querry: ", results);
                    res.json(results);
                })
                .catch(err => {
                    console.log("Error in getRecentPictures: ", err);
                });
        })
        .catch(err => {
            console.log("InsertPicture: ", err);
        });

    // if (req.file) {
    //     res.json({
    //         file: req.file.filename
    //     });
    //     // res.json({ success: true });
    // } else {
    //     res.json({ success: false });
    // }
});

// Testing Loading single Image

app.get("/images/:id", function(req, res) {
    console.log("My Response from Axios: ", req);
    db.getMeOneImageToShow(req.params.id)
        .then(singleImage => {
            console.log(singleImage);
            res.json(singleImage.rows[0]);
        })
        .catch(err => {
            console.log("Error In getMeOneImageToShow: ", err);
        });
});

app.listen(8080, () => console.log("Listening"));
