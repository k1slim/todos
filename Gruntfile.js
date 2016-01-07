module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                files: [
                    {
                        src: 'public/index.html',
                        dest: '../todosBuild/'
                    },
                    {
                        src: 'public/image/**',
                        dest: '../todosBuild/'
                    },
                    {
                        src: 'server.js',
                        dest: '../todosBuild/'
                    },
                    {
                        src: 'js/**',
                        dest: '../todosBuild/'
                    },
                    {
                        src: 'public/bower_components/flux/dist/Flux.min.js',
                        dest: '../todosBuild/public/js/Flux.min.js'
                    },
                    {
                        src: 'public/bower_components/react/react.min.js',
                        dest: '../todosBuild/public/js/react.min.js'
                    },
                    {
                        src: 'public/bower_components/react/react-dom.min.js',
                        dest: '../todosBuild/public/js/react-dom.min.js'
                    },
                    {
                        src: 'public/bower_components/eventEmitter/EventEmitter.min.js',
                        dest: '../todosBuild/public/js/EventEmitter.min.js'
                    }
                ]
            }
        },

        csso: {
            main: {
                files: {
                    '../todosBuild/public/css/main.min.css': 'public/css/compiled/main.css'
                }
            }
        },

        replace: {
            index: {
                src: ['../todosBuild/public/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: /js\/compiled\/app/i,
                        to: "js/production.js"
                    },
                    {
                        from: /css\/compiled\/main.css/i,
                        to: "css/main.min.css"
                    },
                    {
                        from: /bower_components\/requirejs\/require.js/i,
                        to: "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.22/require.min.js"
                    }

                ]
            },
            code: {
                src: ['../todosBuild/public/js/production.js'],
                overwrite: true,
                replacements: [
                    {
                        from: /..\/..\/bower_components\/react\/react/i,
                        to: "react.min"
                    },
                    {
                        from: /..\/..\/bower_components\/react\/react-dom/i,
                        to: "react-dom.min"
                    },
                    {
                        from: /..\/..\/bower_components\/flux\/dist\/Flux/i,
                        to: "Flux.min"
                    },
                    {
                        from: /..\/..\/bower_components\/eventEmitter\/EventEmitter/i,
                        to: "EventEmitter.min"
                    }
                ]
            }
        },

        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "public/js/compiled/app.js",
                    name: "app",
                    include: ['app'],
                    exclude: ['react', 'reactDOM', 'flux', 'eventEmitter'],
                    out: "../todosBuild/public/js/production.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build', ['copy', 'csso', 'requirejs', 'replace']);
};