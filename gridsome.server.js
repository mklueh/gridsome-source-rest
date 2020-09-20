const pluginName = require("./package.json").name;
const axios = require('axios');

/**
 * Can process an object (static) or an array of objects (collection)
 *
 */
class RestSourcePlugin {

    static defaultOptions() {
        return {
            enabled: true,
            debug: false,
            axiosConfig: undefined,
            endpoint: undefined,
            typeName: undefined,
            isStatic: false,
            isCollection: true,
            /**
             * Modify the response before it gets added to
             * the collection
             */
            responseInterceptor: undefined

        }
    }

    constructor(api, options) {
        this.api = api;
        this.options = options;

        if (this.options.isStatic) this.options.isCollection = false;

        this.options = Object.assign(RestSourcePlugin.defaultOptions(), options);

        api.loadSource(this.loadSource.bind(this));
    }

    async loadSource(actions) {
        const instance = axios.create(this.options.axiosConfig);
        const result = await instance.get(this.options.endpoint);
        let data = result.data;

        let responseInterceptor = this.options.responseInterceptor;

        if (responseInterceptor !== undefined && typeof (responseInterceptor) === 'function')
            data = await responseInterceptor(data);

        if (this.options.isStatic)
            this.staticMetadata(data, actions);
        else if (this.options.isCollection)
            this.collectionData(data, actions);
    }

    collectionData(data, actions) {
        const collection = actions.addCollection(this.options.typeName);

        for (let item of data) {
            collection.addNode(item);
        }
    }

    staticMetadata(data, actions) {
        const obj = {};
        obj[this.options.typeName] = data;
        const fields = typeof data !== 'object' || Array.isArray(data) ? obj : data;
        for (const key of Object.keys(fields)) {
            actions.addMetaData(key, fields[key])
        }
    }

    log(a) {
        if (this.options.debug) console.log(`${pluginName}: `, a);
    }
}

module.exports = RestSourcePlugin
