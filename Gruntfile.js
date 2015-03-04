module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      js: {
        files: ['src/js/*.js', 'src/js/**/*.js'],
        tasks: ['concat:js']
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['concat:css']
      }
    },
    concat: {
      options: {
        sourceMap: false,
        sourceMapStyle: 'link' // embed, link, inline
      },
      css: {
        src: 'src/css/*.css',
        dest: 'public/css/bws-client.css'
      },
      js: {
        src: [
          'src/js/app.js',
          'src/js/services/*.js',
          'src/js/controllers/*.js',
          'src/js/init.js'
        ],
        dest: 'public/js/bws-client.js'
      },
      foundation: {
        src: [
          'bower_components/angular/angular-csp.css',
          'bower_components/foundation/css/foundation.css',
          'bower_components/animate.css/animate.css'
        ],
        dest: 'public/css/foundation.css',
      },
      angular: {
        src: [
          'bower_components/moment/moment.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-ui-router/release/angular-ui-router.js',
          'bower_components/angular-local-storage/dist/angular-local-storage.js',
          'bower_components/angular-foundation/mm-foundation.js',
          'bower_components/angular-foundation/mm-foundation-tpls.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-moment/angular-moment.js',
          'bower_components/ng-lodash/build/ng-lodash.js'
        ],
        dest: 'public/lib/angular.js'
      }
    },
    copy: {
      icons: {
        expand: true, 
        flatten: true,
        src: 'bower_components/foundation-icon-fonts/foundation-icons.*', 
        dest: 'public/icons/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'copy']);

};
