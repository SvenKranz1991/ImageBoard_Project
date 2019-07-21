var spicedPg = require("spiced-pg");

var dbUrl;
if (process.env.DATABASE_URL) {
    dbUrl = spicedPg(process.env.DATABASE_URL);
} else {
    dbUrl = spicedPg("postgres:postgres:postgres@localhost:5432/images");
}

exports.getAllPictures = function getAllPictures() {
    return dbUrl.query(`SELECT * FROM images`);
};

exports.getRecentPictures = function getRecentPictures() {
    return dbUrl.query(`SELECT * FROM images ORDER BY id DESC LIMIT 12`);
};

exports.insertPicture = function insertPicture(
    url,
    username,
    title,
    description
) {
    return dbUrl.query(
        // check
        `INSERT INTO images (url,
        username,
        title,
        description)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [url, username, title, description]
    );
};

//////// FOR TESTING WITH IMAGE

exports.getMeOneImageToShow = function getMeOneImageToShow(id) {
    return dbUrl.query(
        `SELECT *
        FROM images
        WHERE id = $1
        `,
        [id]
    );
};

////////// Posting Comment

exports.postingComment = function postingComment(
    img_id,
    commenter,
    comment_content
) {
    return dbUrl.query(
        `INSERT INTO commentsection(img_id, commenter,
        comment_content) VALUES ($1, $2, $3) RETURNING *`,
        [img_id, commenter, comment_content]
    );
};

exports.getComments = function getComments(id) {
    return dbUrl.query(
        `SELECT * FROM commentsection WHERE img_id = $1 ORDER BY created_at DESC`,
        [id]
    );
};

exports.getMoreImages = function getMoreImages(lastId) {
    return dbUrl.query(
        `SELECT * FROM images
        WHERE id <$1
        ORDER BY id DESC
        LIMIT 6`,
        [lastId]
    );
};

//
// `SELECT id,
// (SELECT id FROM images ORDER BY
// id ASC LIMIT 1)
// AS "lowestId" FROM images
// WHERE id < 10
// ORDER BY id DESC
// LIMIT 20`
