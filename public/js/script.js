(function() {
    new Vue({
        el: ".main",
        name: "I hate Bugs",
        data: {
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            showmodal: location.hash.slice(1),
            morePictures: true
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

            addEventListener("hashchange", function() {
                let firstId = self.images[0].id;
                console.log("FirstId: ", firstId);
                if (self.showmodal <= firstId) {
                    self.showmodal = location.hash.slice(1);
                } else {
                    this.$emit("closeModal");
                }
            });
        }, // closes mounted
        methods: {
            handleClick: function() {
                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("username", this.username);
                formData.append("description", this.description);
                formData.append("file", this.file);
                let self = this;

                axios
                    .post("/upload", formData)
                    .then(function(resp) {
                        console.log("resp from POST /upload: ", resp);
                        self.images = resp.data.rows;
                        self.title = "";
                        self.description = "";
                        self.username = "";
                        self.file = null;
                        self.morePictures = true;
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
                this.showmodal = id;
                console.log("clicked Id: ", this.showModal);
            }, // closes handleChange
            getMore: function() {
                let lastId = this.images[this.images.length - 1].id;
                let firstId = this.images[0].id;
                console.log("My Last ID:", lastId);
                console.log(firstId);
                // console.log("My showmodal: ", this.showmodal);
                let self = this;

                axios
                    .get(`/getMoreImages/${lastId}`)
                    .then(function(newImages) {
                        console.log(
                            "My Response for getMoreImages: ",
                            newImages
                        );
                        if (newImages.data.rows.length < 6) {
                            self.morePictures = false;
                        }
                        self.images = self.images.concat(newImages.data.rows);
                    })
                    .catch(err => {
                        console.log(
                            "Error in Axios getMoreImages Route: ",
                            err
                        );
                    });
            },
            closeModal: function() {
                this.showmodal = null;
                location.hash = "";
                history.replaceState(null, null, " ");
            }
        }
    }); // closes Vue
})();
