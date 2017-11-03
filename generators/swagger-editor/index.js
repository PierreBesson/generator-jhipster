/**
 * Copyright 2013-2017 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const chalk = require('chalk');
const shelljs = require('shelljs');
const BaseGenerator = require('../generator-base');
const connect = require('connect');
const portfinder = require('portfinder');
const swaggerEditor = require('./swagger-editor');
const fs = require('fs');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            sayHello() {
                this.log(chalk.white('Welcome to the JHipster Swagger Editor\n'));
            },

            checkSwaggerCodegenEnabled() {
                this.isSwaggerCodegenEnabled = this.config.get('enableSwaggerCodegen');
            },

            runSwaggerEditor() {
                this.log('Starting Swagger Editor');
                const swaggerFilePath = './src/main/resources/swagger/api.yml';

                portfinder.getPort({ port: 5000 }, (err, port) => {
                    fs.readFile(swaggerFilePath, 'utf8', (err, data) => {
                        if (err) {
                            return this.log(err);
                        }

                        const app = connect();
                        app.use(swaggerEditor.swaggerEditorMiddleware(swaggerFilePath));
                        app.listen(port);
                        this.log(chalk.white(`swagger-editor started http://localhost:${port}`));
                        if (this.isSwaggerCodegenEnabled) {
                            this.log(chalk.white(`Swagger Codegen is enabled for this application\nSynchronizing the Swagger Editor with file: ${swaggerFilePath}`));
                            swaggerEditor.syncSwaggerFile(data, swaggerFilePath);
                        }
                    });
                });
            },
        };
    }
};
