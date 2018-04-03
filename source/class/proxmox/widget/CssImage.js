/* ************************************************************************

   Copyright: 2018

   License: MIT license

   Authors:

************************************************************************ */

qx.Class.define("proxmox.widget.CssImage",
{
  extend : qx.ui.core.Widget,

  construct: function(cssClasses) {
    this.base(arguments);

    if (cssClasses) {
      this.setSetCssClasses(cssClasses);
    }
  },

  properties: {
    appearance: {
      refine: true,
      init: "cssimage"
    },

    /* this is here so it works as drop in replacement for qx.ui.basic.Image */
    source: {
      init: null,
      nullable: true,
    },

    cssClasses: {
      check: "Array",
      init: null,
      nullable: true,
      event: "changeCssClasses",
      apply: "_applyCssClasses",
      themeable: true
    }
  },

  members: {
    // Overwriten
    _getContentHint: function()
    {
      return {
        width: 24,
        height: 16,
      }
    },

    _applyCssClasses: function(value, old) {
      var cElem = this.getContentElement();
      if (old != null) {
        old.forEach((sc) => {
          cElem.removeClass(sc);
        });
      }

      if (value != null) {
        value.forEach((sc) => {
            cElem.addClass(sc);
        });
      }
    }
  }
});