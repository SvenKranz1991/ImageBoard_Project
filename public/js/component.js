Vue.component("modal-component", {
    template: "#modal-template",
    data: function() {
        return {
            showimage: {
                url: "",
                username: "",
                title: "",
                description: "",
                created_at: ""
            }
        };
    },
    props: ["id"],
    mounted: function() {
        var id = this.id;
        const self = this;

        axios
            .get("/images/" + id)
            .then(resp => {
                console.log("My response from images Images.data: ", resp.data);

                console.log("Component mounted!");
                self.showimage = resp.data;
                // console.log("showimage Data: ", resp.data.rows[0]);
                // self.url = resp.data[0].url;
                // self.description = resp.data[0].description;
                // self.id = resp.data[0].id;
                // self.title = resp.data[0].title;
                // self.username = resp.data[0].username;
                // self.created_at = resp.data[0].created_at;

                // console.log("Image.data[0]: ", image.data[0]);
                // console.log(
                //     "My self Data: ",
                //     "My Url: ",
                //     self.url,
                //     "My Description: ",
                //     self.description,
                //     "My id: ",
                //     self.id,
                //     "My Title: ",
                //     self.title,
                //     "My Username: ",
                //     self.username,
                //     "My created_at: ",
                //     self.created_at
                // );
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
        }
    }
});
