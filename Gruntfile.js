module.exports = function(grunt) {
    grunt.initConfig({
        bowercopy: {
            options: {
                clean: true
            },
            dependencies: {
                options : {
                },
                files: {
                    'src/js/lib' : 'bower_components/angular/angular.min.js',
                    'src/css' : 'bower_components/bootstrap/dist/css/bootstrap.min.css'
                }
            }
        },
        concat: {
            css: {
                src: [
                    "src/css/bootstrap.min.css",
                ],
                dest: 'public/css/application.css'
            },
            js: {
                src: [
                    "src/js/lib/angular.min.js",
                    "src/js/app.js",
                    "src/js/controllers/main.js",
                    "src/js/services/notes.js",
                ],
                dest: 'public/js/application.js'
            },
        },
        uglify: {
            js: {
                options: {
                    mangle: false
                },
                src: 'public/js/application.js',
                dest: 'public/js/application.js'
            }
        },
        copy: {
            src: {
                src: 'src/index.html',
                dest: 'public/index.html'
            }
        },
        htmlmin: {
            index : {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': 'public/index.html',
                }
            }
        },
        favicons: {
            options: {},
            icons: {
                src: 'src/img/logo.png',
                dest: 'public/img'
            }
        },
        express: {
            options: {
                port: 8080
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            },
            prod: {
                options: {
                    script: 'server.js',
                }
            },
            test: {
                options: {
                    script: 'server.js'
                }
            }
        },
        notify: {
            watch: {
                options: {
                    title: 'Build Complete',
                    message: 'The build has finished running',
                    duration: 3
                }
            },
            server: {
                options: {
                    title: 'Angular Notes App',  // optional
                    message: 'Build is ready!',
                    duration: 3
                }
            }
        },
        watch: {
            express: {
                files: ['src/js/**/*.js', 'src/index.html', 'src/css/**/*.css'],
                tasks: ['bowercopy:dependencies', 'concat:css', 'concat:js', 'uglify', 'copy:src', 'express:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('serve:dev', [ 'bowercopy:dependencies', 'concat:css', 'concat:js', 'uglify', 'copy:src', 'express:dev', 'notify:server', 'watch' ]);
    grunt.registerTask('serve:prod', [ 'bowercopy:dependencies', 'concat:css', 'concat:js', 'uglify', 'copy:src', 'htmlmin:index', 'express:prod' ]);
};


