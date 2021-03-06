/*
 * Copyright 2016 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var fs = require('fs');
var yargs = require('yargs');
var utils = require('./utils');
var packageJSON = require('../package.json');

/**
 * @summary Parsed CLI options and arguments
 * @type Object
 * @public
 */
module.exports = yargs
  .demand(1, 'Missing image')

  // Usage help
  .usage('Usage: $0 <image>')
  .epilogue([
    'If you need help, don\'t hesitate in contacting us at:',
    '',
    '  GitHub: https://github.com/resin-io/etcher-cli/issues/new',
    '  Gitter: https://gitter.im/resin-io/chat'
  ].join('\n'))

  // Examples
  .example('$0 raspberry-pi.img')
  .example('$0 -d /dev/disk2 ubuntu.iso')
  .example('$0 -d /dev/disk2 -y rpi.img')

  // Help option
  .help()

  // Version option
  .version(function() {
    return packageJSON.version;
  })

  // Error reporting
  .fail(function(message, error) {
    yargs.showHelp();
    utils.printError(error || message);
    process.exit(1);
  })

  // Assert that image exists
  .check(function(argv) {
    fs.accessSync(argv._[0]);
    return true;
  })

  .options({
    help: {
      describe: 'show help',
      boolean: true,
      alias: 'h'
    },
    version: {
      describe: 'show version number',
      boolean: true,
      alias: 'v'
    },
    drive: {
      describe: 'drive',
      string: true,
      alias: 'd'
    },
    yes: {
      describe: 'confirm non-interactively',
      boolean: true,
      alias: 'y'
    }
  })
  .argv;
