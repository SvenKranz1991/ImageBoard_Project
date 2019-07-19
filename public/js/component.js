(function() {
    Vue.component("modalshow", {
        template: "#modalshow-template",
        data: function() {
            return {
                url: "",
                title: "",
                created_at: "",
                description: "",
                username: "",
                comment: []
            };
        },
        props: ["showmodal"],
        mounted: function() {
            const self = this;
            console.log(this.showmodal);

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
                    console.log("Err in axios getComponent /image/:id ", err);
                });
        },
        methods: {
            clicked: function() {
                this.something = this.whatever;
            },
            clickedImage: function() {
                this.$emit("change", "Changed Modal Prop on Click emit");
            },
            submitComment: function(e) {
                console.log("Comment Values: ", this);
                console.log("this.commenter: ", this.commenter);
                console.log("comment_content: ", this.comment_content);
                console.log("this.showmodal: ", this.showmodal);

                let self = this;

                axios
                    .post("/postComment/" + this.showmodal, {
                        commenter: this.commenter,
                        comment_content: this.comment_content
                    })
                    .then(function(resp) {
                        // console.log(
                        //     "Response from Posting Comment: ",
                        //     resp.data
                        // );

                        console.log("My Resp from Server: ", resp.data);
                    })
                    .catch(function(err) {
                        console.log("Error in Posting Comment: ", err);
                    });
            }
        }
    });
})();
