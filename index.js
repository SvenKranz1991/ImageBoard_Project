// Setting up
// Some message check!
// Another check!

const express = require("express");
const app = express();

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

const s3 = require("./s3");
const config = require("./config");
const db = require("./utils/db");

app.use(require("body-parser").json());

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

app.use(express.static("./images"));

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
});

// Upload Route

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("My Request in Index: ", req);

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
    // res.json({ success: true });
    // } else {
    //     res.json({ success: false });
    // }
});

// Testing Loading Single Image in Modal
// Bug with displaying other properties

app.get("/images/:showmodal", function(req, res) {
    db.getMeOneImageToShow(req.params.showmodal)
        .then(results => {
            console.log("getMeOneImageResult: ", results.rows[0]);
            res.json(results.rows[0]);
        })
        .catch(err => {
            console.log("Error In getMeOneImageToShow: ", err);
        });
});

// Comment Section

app.post("/postComment/:showmodal", (req, res) => {
    db.postingComment(
        req.params.showmodal,
        req.body.commenter,
        req.body.comment_content
    )
        .then(recentComment => {
            res.json({
                comment: recentComment.rows[0]
            });
        })
        .catch(err => {
            console.log("Error in postingComment: ", err);
        });
});

// Getting All Comments

app.get("/comments/:showmodal", (req, res) => {
    db.getComments(req.params.showmodal)
        .then(allcomment => {
            console.log("My Comment: ", allcomment.rows);
            res.json(allcomment.rows);
        })
        .catch(err => {
            console.log("Error in getComment: ", err);
        });
});

// Getting more images

app.get("/getMoreImages/:lastId", (req, res) => {
    console.log(req.params.lastId);
    // console.log("Log Axios - Get more Images: ", req);

    let lastId = req.params.lastId;

    db.getMoreImages(lastId)
        .then(results => {
            console.log("My Results from get More Images: ", results);
            res.json(results);
        })
        .catch(err => {
            console.log("Error in getting more Images: ", err);
        });
});

app.listen(8080, () => console.log("Listening"));
