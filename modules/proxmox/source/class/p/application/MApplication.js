/**
 * The base mixin for all Qooxdoo based proxmox applications.
 */
qx.Mixin.define("p.application.MApplication", {
    properties: {
        contentContainer: {
            nullable: true,
            apply: "_appplyContentContainer"
        },

        caps: {
            nullable: true,
        },
    },

    members: {
        _serviceManager: null,

        _localStore: null,

        _router: null,

        initcore: function () {
            /**
             * Localstore
             */
            this._localStore = new qx.bom.Storage.getLocal();

            /**
             * ServiceManager
             */
            this._serviceManager = new p.service.Manager();

            /**
             * Navigator
             */
            this._navigator = new p.page.Navigator(this);
        },

        getServiceManager: function () {
            return this._serviceManager;
        },

        getLocalStore: function () {
            return this._localStore;
        },

        getNavigator: function() {
            return this._navigator;
        },

        _appyLanguage: function (value) {
            if (value !== null) {
                qx.locale.Manager.getInstance().setLocale(value);
            }
        },
    },

    destruct: function () {
        this._disposeObjects("_serviceManager", "_localStore");
    }
});