const Plugins = [
    // Bootstrap
    {
        from: "node_modules/bootstrap/dist",
        to: "dist/plugins/bootstrap"
    },
    // jQuery
    {
        from: "node_modules/jquery/dist",
        to: "dist/plugins/jquery"
    },
    // jQuery Validation
    {
        from: "node_modules/jquery-validation/dist",
        to: "dist/plugins/jquery-validation"
    },
    // Popper
    {
        from: "node_modules/popper.js/dist",
        to: "dist/plugins/popper.js"
    },
    // Fontawesome
    {
        from: "node_modules/fontawesome-free/css",
        to: "dist/plugins/fontawesome-free/css"
    },
    {
        from: "node_modules/fontawesome-free/webfonts",
        to: "dist/plugins/fontawesome-free/webfonts"
    }
];
module.exports = Plugins;