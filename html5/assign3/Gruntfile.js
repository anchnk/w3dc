'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    htmlcompressor: {
      compile: {
        files: {
          src: 'index.html',
          dest: 'prod/index.html'
        },
        options: {
          type: 'html',
          output: 'prod/index.html'
        }
      }
    },
    cssmin: {
      compile: {
        src: 'css/assign3.css',
        dest: 'prod/css/assign3.css'
      }
    },
    uglify: {
      compile: {
        src: 'js/*.js',
        dest: 'prod/js/geolocvalidate.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-htmlcompressor');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['htmlcompressor', 'cssmin', 'uglify']);

};