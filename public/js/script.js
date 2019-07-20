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
            showmodal: location.hash.slice(1)
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
                console.log(lastId);

                axios
                    .get("/getMoreImages/", {
                        lastId: lastId
                    })
                    .then(function(resp) {
                        console.log(resp);
                    })
                    .catch(err => {
                        console.log(
                            "Error in Axios getMoreImages Route: ",
                            err
                        );
                    });
            }
        }
    }); // closes Vue
})();
