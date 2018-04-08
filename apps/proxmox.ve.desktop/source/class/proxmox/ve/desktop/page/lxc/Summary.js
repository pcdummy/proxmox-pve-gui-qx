qx.Class.define("proxmox.ve.desktop.page.lxc.Summary", {
    extend: qx.core.Object,
    include: [
        proxmox.core.page.core.MSubPage
    ],
    implement: [
        proxmox.core.page.core.ISubPage
    ],

    members: {
        getSubPageContainer: function () {
            // Content
            var scroll = new qx.ui.container.Scroll().set({
                scrollbarX: "auto",
                scrollbarY: "auto",
                height: qx.bom.Viewport.getHeight()
            });
            scroll.add(new qx.ui.core.Widget().set({ width: 2000, minWidth: 2000, height: 2000, minHeight: 2000 }));

            return scroll;
        }
    }
});