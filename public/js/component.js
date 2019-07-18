// (function() {
Vue.component("modal-component", {
    template: "#modal-template",

    data: function() {
        return {
            something: "My Modal"
        };
    },
    props: ["id"],
    mounted: function() {
        var id = this.id;
        console.log("My Id: ", id);
        // var self = this;
        console.log("Modal component mounted");
        // axios
        //     .get("/image/:id")
        //     .then(image => {
        //         console.log("Images: ", image);
        //     })
        //     .catch(err => {
        //         console.log("Err in axios get component /image/:id ", err);
        //     });
    },
    methods: {
        clicked: function() {
            this.something = this.whatever;
            // this.showSecondLoveComponent = true;
        },
        clickedImage: function() {
            this.$emit("change", "Changed Modal Prop on Click emit");
        },
        clicked2: function() {
            // this.$emit("change", "discoduck");
            console.log("goodgoodgood");
        }
    }
});
// })();
