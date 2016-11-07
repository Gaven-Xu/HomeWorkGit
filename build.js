const packager = require("electron-packager");
const package = require("./source/package.json");

packager({
    name: 'HomeWork',
    dir: "./source",
    out: "./dist",
    icon: "./source/homework.ico",
    platform: "win32",
    arch: "x64",
    version: "1.3.4",
    overwrite: true,
    asar: false,
    "app-version": package["version"],
    "app-copyright": "Copyright (C) 2016 "+package["author"]+".",

    "version-string": {
        CompanyName: "totoraj.net",
        FileDescription: package["name"],
        OriginalFilename: package["name"]+".exe",
        ProductName: package["name"],
        InternalName: package["name"]
    }

}, function (err, appPaths) {
    if (err) console.log(err);
    console.log("Done: " + appPaths);
});
