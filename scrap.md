Component.js

// component - naming conventions - name connected with hyphen
// // Normal way
// template: '<span>"I love components"</span>',
// Could use Template Strings
// template: "<span>{{something}}</span>",

// Not optimal in component, because components shoudl have its own data -->
// data: {
// something: "vue"
// }

// from Doc
// props: ["id", "name", "country"],
// methods: {
// changed: function(e) {
// this.\$emit("changed", this.id, e.target.value);
// }
// },
// template:
// '<span>{{name}}, {{country}} <input v-bind:value="name" v-on:input="changed"></span>'

index.js

// From documentation
// uploader.single RUNS all the boilerplate code from above. It takes the file it got from formData, changes its name, and stores it in the /uploads directory

///////
// app.post("/upload", uploader.single("file"), function(req, res) {
// // If nothing went wrong the file is already in the uploads directory
//
// // uploader.single, when successful, adds a property called "file" to the request object. "file" represents the file that was just uploaded
// // to /uploads
// if (req.file) {
// res.json({
// success: true
// });
// } else {
// res.json({
// success: false
// });
// }
// });

// app.post("/cities", function(req, res) {});

// the server's job now with frameworks is to give our framework (in this case Vue) the data it needs to render on screen

// with Multi Page Application's (MPA's) the server's job is to figure out what should be rendered on screen.

// In SPA's the server's job is to give / post data whenever the framework asks it to. Otherwise the framework is responsible for figuring out what should be shown on screen.

script.js

// created
// mounted: runs after HTML has loaded. It's a "lifecycle method"
// In "mounted" we're going to make ajax requests to get data the user wants to see the initial moment the page is loaded.
// If you're ever in a situation (which you will be a lot!) in which you want to render information the moment the page is rendered... you'll probably want to fetch that data in the "mounted" function!
// destroyed

index.HTML

<!-- closes images-container -->

    <!-- <modal-modal v-if="currentImage" :id="currentImage" @close="closeModal"></modal-modal> -->




            <!-- For Modal -->

            <!-- Add clickhandler to all images in a loop - // add it onto "imagepost" -->




    <!-- Not optimal - inline Template - not reusable -->

<!-- <modal-component inline-template>
    <div>
        <h1>Thats a Inline template in modal component</h1>
    </div>
</modal-component> -->

    <!-- <love-component v-if='showSecondLoveComponent'>GoGoGo</love-component> // something I dont understand -->
