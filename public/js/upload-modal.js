(function() {
    Vue.component("uploadshow", {
        template: "#uploadmodal-template",
        data: function() {
            return {
                url: "",
                title: "",
                created_at: "",
                description: "",
                username: "",
                comments: [],
                comment_content: "",
                commenter: "",
                warning: false
            };
        },
        props: ["showmodal"],
        mounted: function() {
            const self = this;
            console.log(this.showmodal);

            axios
                .get(`/images/` + this.showmodal)
                .then(resp => {
                    console.log("Response from Index: ", resp.data);
                    console.log("Component mounted!");
                    self.image = resp.data;

                    self.url = self.image.url;
                    self.title = self.image.title;
                    self.created_at = self.image.created_at;
                    self.username = self.image.username;
                    self.description = self.image.description;

                    console.log("self.url: ", self.url);
                    console.log("self.thetitle: ", self.title);
                })
                .catch(err => {
                    console.log("Err in axios getComponent /image/:id ", err);
                });

            axios
                .get(`/comments/` + this.showmodal)
                .then(resp => {
                    console.log("Response from get Comments: ", resp.data);
                    self.comments = resp.data;

                    console.log("Self.Comments: ", self.comments);
                })
                .catch(err => {
                    console.log(
                        "Error in getting Comments in Vue Component: ",
                        err
                    );
                });
        },
        watch: {
            showmodal: function() {
                // // check if request hash number is bigger than latest id in grid
                let firstId = this.images[0].id;
                let lastId = this.images[this.images.length - 1].id;

                //
                // let num = location.hash.slice(1);
                //
                if (num > firstId) {
                    console.log("Sorry, wrong number!");
                } else {
                    console.log("cool!");
                }

                var self = this;
                axios
                    .get("/images/" + this.showmodal)
                    .then(resp => {
                        console.log("Response from Index: ", resp.data);
                        console.log("Component mounted!");

                        self.image = resp.data;
                        self.url = self.image.url;
                        self.title = self.image.title;
                        self.created_at = self.image.created_at;
                        self.username = self.image.username;
                        self.description = self.image.description;

                        console.log("self.url: ", self.url);
                        console.log("self.thetitle: ", self.title);
                    })
                    .catch(err => {
                        console.log(
                            "Err in axios getComponent /image/:id ",
                            err
                        );
                    });

                axios
                    .get("/comments/" + this.showmodal)
                    .then(resp => {
                        console.log("Response from get Comments: ", resp.data);
                        self.comments = resp.data;

                        console.log("Self.Comments: ", self.comments);
                    })
                    .catch(err => {
                        console.log(
                            "Error in getting Comments in Vue Component: ",
                            err
                        );
                    });
            }
        },
        methods: {
            clicked: function() {
                this.something = this.whatever;
            },
            clickedImage: function() {
                this.$emit("change", "Changed Modal Prop on Click emit");
            },
            submitComment: function() {
                let self = this;

                if (self.commenter == "" || self.comment_content == "") {
                    self.warning = true;
                } else {
                    self.warning = false;
                    axios
                        .post(`/postComment/` + self.showmodal, {
                            commenter: self.commenter,
                            comment_content: self.comment_content
                        })
                        .then(resp => {
                            console.log(
                                "My Resp from Server /postComment/: ",
                                resp.data
                            );

                            self.comments.unshift(resp.data.comment);
                            self.comment = "";
                            self.commenter = "";
                            self.comment_content = "";
                        })
                        .catch(function(err) {
                            console.log("Error in Posting Comment: ", err);
                        });
                }
            }
        }
    });
})();
