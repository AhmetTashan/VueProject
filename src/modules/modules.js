import router from "@/router";
import store from "@/store";

const registerModule = (fileName, module) => {
    if (module.store) {
        store.registerModule(fileName, module.store);
    }

    if (module.router) {
        module.router(router);
    }
};


/**
 * klasör içindeki tüm modülleri yükler
 * yalnız modulAdi/modulAdi.module.js dosyası yüklenir
 * */
const requireModule = require.context('.', true, /\.module.js$/);

requireModule.keys().forEach(fileName => {
    const moduleConfig = requireModule(fileName);
    const moduleName = fileName.replace(/(\.\/|\.module\.js)/g, '');
    registerModule(moduleName.split('/')[0], moduleConfig.default);
})
