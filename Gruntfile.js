module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            cleanup_js: ['public/js/*'],
            cleanup_css: ['public/css/*'],
        },
        concurrent: {
            main: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            main: {
                script: './bin/www',
                options: {
                    cwd: __dirname,
                    ignore: ['Gruntfile.js', 'bower.json', '.gitignore', 'package.json', 'README.md', 'node_modules/**', 'bower_components/**', 'public/**', '/views/**', 'assets/js/**', 'assets/css/**'],
                }
            }
        },
        jshint: {
            assets: ['assets/**/*.js'],
            server: ['app.js']

        },
        concat: {
            scripts: {
                options: {
                    separator: ';'
                },
                src: ['assets/js/**.js'],
                dest: 'public/js/<%= pkg.name %>.js'
            },
            css: {
                src: ['assets/css/**.css'],
                dest: 'public/css/<%= pkg.name %>.css'
            },
        },
        watch: {
            scripts: {
                files: ['assets/css/**', 'assets/js/**', 'assets/img/**'],
                tasks: ['sync', 'sass', 'coffee', 'concat', 'cssmin', 'uglify', ],
                options: {
                    spawn: true,
                },
            },
        },
        cssmin: {
            css: {
                src: 'public/css/<%= pkg.name %>.css',
                dest: 'public/css/<%= pkg.name %>.min.css'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'public/js/<%= pkg.name %>.min.js': ['public/js/<%= pkg.name %>.js'],
                }
            }
        },
        coffee: {
            compile: {
                files: {
                    'assets/js/site.js': ['assets/coffee/*.coffee'] // compile and concat into single file
                }
            },
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    trace: true,
                    style: 'compressed',
                    update: true,
                    debugInfo: false
                },
                files: [{
                    expand: true,
                    cwd: 'assets/sass',
                    src: ['**/*.scss'],
                    dest: 'assets/css/',
                    ext: '.css'
                }]
            }
        },
        sync: {
            main: {
                files: [
                    {
                        expand: true,
                        dest: 'public/img/',
                        cwd: 'assets/img/',
                        src: ['**']
                    },
                    {
                        expand: true,
                        dest: 'assets/js/',
                        cwd: 'node_modules/material-design-lite/',
                        src: ['material.js']
                    },
                    {
                        expand: true,
                        dest: 'assets/css/',
                        cwd: 'node_modules/material-design-lite/',
                        src: ['material.css']
                    },
                ],
                updateAndDelete: false, // Remove all files from dest that are not found in src. Default: false
                compareUsing: "md5", // compares via md5 hash of file contents, instead of file modification time. Default: "mtime"
                verbose: true // Display log messages when copying files
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-sync');

    grunt.registerTask('default', ['clean', 'coffee', 'sass', 'sync', 'concat', 'cssmin', 'uglify', 'concurrent']);

};