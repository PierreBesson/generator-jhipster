const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const mkdirp = require('mkdirp').sync;
const Path = require('path');
const sway = require('sway');
const jsYaml = require('js-yaml');

/**
 * Simple server for Swagger Editor with local file synchronisation
 * Heavily inspired by https://github.com/Rebilly/swagger-repo
 *
 */
exports.swaggerEditorMiddleware = function (swaggerFilePath) {
    const router = express.Router();

    router.use('/config/defaults.json', express.static(require.resolve('./editor-defaults.json')));
    router.use('/sample-specs/petstore.yaml', express.static(require.resolve('./sample-specs/petstore.yaml')));
    router.use('/', express.static(Path.dirname(require.resolve('swagger-editor/index.html'))));

    router.get('/api.yml', (req, res) => {
        res.setHeader('Content-Type', 'application/yaml');
        res.end(fs.readFileSync(swaggerFilePath, 'utf-8'));
    });

    router.use(bodyParser.text({
        type: 'application/yaml',
        limit: '10mb'// default limit was '100kb' which is too small for many specs
    }));

    router.put('/api.yml', (req, res) => {
        exports.syncSwaggerFile(req.body, swaggerFilePath);
        res.end('ok');
    });

    return router;
};

exports.swaggerUiMiddleware = function () {
    return express.static(Path.dirname(require.resolve('swagger-ui/dist/index.html')));
};

exports.syncSwaggerFile = function (swaggerData, swaggerFilePath) {
    if (_.isString(swaggerData)) {
        if (!fs.existsSync(swaggerFilePath)) {
            return fs.writeFileSync(swaggerFilePath, swaggerData);
        }
        swaggerData = parseSwagger(swaggerData);
    }

    updateYaml(swaggerFilePath, swaggerData);
};

function parseSwagger(string) {
    try {
        return JSON.parse(string);
    } catch (jsonError) {
        try {
            return jsYaml.safeLoad(string, { json: true });
        } catch (yamlError) {
            throw new Error('Can not parse Swagger both in YAML and JSON');
        }
    }
}

function updateYaml(file, newData) {
    let currentData;
    try {
        currentData = jsYaml.safeLoad(fs.readFileSync(file, 'utf-8'));
    } catch (e) { return; }

    if (!_.isEqual(newData, currentData)) {
        mkdirp(Path.dirname(file));
        fs.writeFileSync(file, jsYaml.safeDump(newData, { noRefs: true }));
    }
}

exports.validateSwagger = function (swagger, cb) {
    sway.create({ definition: swagger })
        .then(swaggerObj => cb(null, swaggerObj.validate()), (error) => {
            cb(error);
        });
};
