module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks

    // Concatenation
    concat: {
      dist: {
        src: 'src/js/theme.js',
        dest: 'src/js/scripts.js'
      }
    },

    // Uglify
    uglify: {
      dist: {
        src: 'src/js/scripts.js',
        dest: 'src/js/scripts.min.js'
      }
    },

    // SASS
    sass: {
      dist: {
        options: {
          trace: true,
          style: 'compressed',
          precision: 8
        },
        files: {
          'src/styles.css' : 'src/sass/styles.scss'
        }
      },
    },

    // Optimize images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/src/',
          src: '**/*.{png,jpg,gif,svg}',
          dest: 'src/images/'
        }]
      }
    },

    // Autoprefixer
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'src/styles.css',
        dest: 'src/styles.css'
      }
    },

    // Copy
    copy: {
      build: {
        files: [
          // Copy HTML and CSS Files
          {expand: true, cwd: 'src/', src: ['*', '!sass', '!*.map', '!.DS_Store'], dest: 'dist/'},
          // Copy images
          {expand: true, cwd: 'src/', src: ['images/*', '!.DS_Store'], filter: 'isFile', dest: 'dist/'},
          // Copy JS
          {expand: true, cwd: 'src/', src: ['js/*.min.js', '!.DS_Store'], dest: 'dist/'}
        ]
      },
      img: {
        files: [
          {expand: true, cwd: 'src/images/src/', src: ['*.{svg,png,jpg,gif}', '!.DS_Store'], dest: 'src/images/'},
        ]
      }
    },

    // Clean
    clean: {
      dist: {
        src: 'dist/**/*'
      },
      dsstore: {
        src: ['.DS_Store', 'src/.DS_Store', 'src/**/.DS_Store', 'dist/.DS_Store', 'dist/**/.DS_Store']
      },
    },

    // Watch
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/*.html'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: 'concat',
        options: {
          spawn: false
        }
      },
      sass: {
        files: ['src/sass/*.scss'],
        tasks: 'sass',
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/styles.css'],
        tasks: 'postcss',
        options: {
          spawn: false
        }
      },
      img: {
        files: ['src/images/src/*.{svg,png,jpg,gif}'],
        tasks: 'copy:img',
        options: {
          spawn: false
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

  // Distribution build
  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory',
    ['imagemin', 'clean:dist', 'copy', 'clean:dsstore']);

};
