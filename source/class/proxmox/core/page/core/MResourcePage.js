qx.Mixin.define("proxmox.core.page.core.MResourcePage", {
    include: [
        qx.locale.MTranslation,
    ],

    construct: function () {
        var app = this._serviceManager = qx.core.Init.getApplication();
        var sm = this._serviceManager = app.getServiceManager();

        this._resourceService = sm.getService("cluster/resources");

        this._resourceService.addListener("changeModel", (e) => {
            if (this.getId() == null) {
                return;
            }

            var model = e.getData();
            this.__updateDataFromService(model);
        });
        this.__updateDataFromService(this._resourceService.getModel());
    },

    properties: {
        id: {
            check: "String",
            apply: "_applyId",
            nullable: true
        },

        resourceData: {
            async: true,
            event: "changeResourceData",
            nullable: true,
            init: null
        }
    },

    members: {
        _app: null,
        _serviceManager: null,

        _contentContainer: null,
        _currentSubPageContainer: null,
        _resourceService: null,

        _applyId: function (value, old) {
            this.__updateDataFromService(this._resourceService.getModel());
        },

        __updateDataFromService: function (model) {
            if (!model) {
                return
            }

            var nodeId = this.getId();
            model.forEach((node) => {
                if (node.getId() == nodeId) {
                    this.setResourceDataAsync(node).then(() => { return null; });
                }
            });
        },

        // proxmox.page.core.IView implementation
        getContainerAsync: function () {
            if (this.getResourceData() === null) {

                return new qx.Promise((resolve, reject) => {
                    this.addListenerOnce("changeResourceData", resolve)
                }).then(() => {
                    this._contentContainer = this._getContentContainer();
                    return this._contentContainer;
                });
            }

            return this.getResourceDataAsync().then(() => {
                this._contentContainer = this._getContentContainer();
                return this._contentContainer;
            });
        },

        // proxmox.page.core.IView implementation
        navigateToPageId: function (pageId) {
            var subPage = this._getSubPage(pageId);
            if (subPage === false) {
                return false;
            }

            subPage.setPage(this);
            subPage.set({
                id: this.getId(),
            });

            if (this._currentSubPageContainer != null) {
                this._contentContainer.remove(this._currentSubPageContainer);
            }

            var subc = this._currentSubPageContainer = subPage.getSubPageContainer();
            this._contentContainer.add(subc, { edge: "north", width: "100%" });

            return true;
        }
    },

    destruct: function() {
        this._serviceManager.disposeResourceServices();
        this._disposeObjects("_contentContainer", "_currentSubPageContainer");
    }
});