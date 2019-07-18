// inside of JS directory, create "script.js"
// here is where ALL the Vue code will go!

(function() {
    new Vue({
        el: ".main",
        name: "I love Pixels",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            showModal: false
            // ,showSecondLoveComponent: false // closing cities
        }, // closes data
        mounted: function() {
            var self = this;
            axios
                .get("/images")
                .then(function(resp) {
                    self.images = resp.data.rows;
                    console.log("selfImages: ", self.images);
                    console.log("Resp: ", resp);
                })
                .catch(function(err) {
                    console.log("err in GET /images: ", err);
                }); // any get request you want

            // I dont know where and still paste it here

            axios.post("/comment", {
                imageId: this.id,
                comment: this.commentText,
                username: this.commentUsername
            });

            // modal
        }, // closes mounted
        methods: {
            handleClick: function() {
                // this function runs when user selects an image on the file input field

                // FormData API is necessary for sending FILES from client to server

                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);
                let self = this;
                // for (var pair of formData.entries()) {
                //     console.log(pair[0] + ", " + pair[1]);
                // }
                // console.log("formData", formData.entries());

                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        console.log("resp from POST /upload: ", resp);
                        self.images = resp.data.rows;
                    })
                    .catch(function(err) {
                        console.log("error in POST /upload: ", err);
                    });
            },
            handleChange: function(e) {
                this.file = e.target.files[0];
                console.log(
                    "e.target.files[0] in handleChange: ",
                    e.target.files[0]
                );
            },
            clicked: function(id) {
                this.showModal = id;
                console.log("clicked");
                console.log(this.showModal);

                axios
                    .get("/images/:id", this.showModal)
                    .then(function(resp) {
                        console.log("resp in Post /images/:id", resp);
                    })
                    .catch(function(err) {
                        "error in POST /images id", err;
                    });
            } // closes handleChange
        }
    }); // closes Vue
})();
