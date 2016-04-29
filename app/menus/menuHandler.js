
var remote = require('remote');
var Menu = remote.require('menu');
var handlers = require('./mainMenuHandlers.js');

var topMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Save',
        accelerator: 'Command+S',
        click: function(){
            handlers.openImages();
        }
    }, {
        label: 'Save As'
    }, {
        label: 'Load'
    }]
},{
    label:'Images',
    submenu: [
        {label: 'Load'}
    ]
},{
    label: 'View',
    submenu: [{
        label: 'Reload',
        accelerator: 'Command+R',
        click: function() {
            remote.getCurrentWindow().reload();
        }
    }, {
        label: 'Toggle DevTools',
        accelerator: 'Alt+Command+I',
        click: function() {
            remote.getCurrentWindow().toggleDevTools();
        }
    }]
}];

var contextMenuTemplate = [{
    label: 'Window',
    submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
    }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
    }, {
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
    }]
}];

var contextMenu = null;
let contextCallbackSet = false;

function configureContextMenuCallback(window) {
    if(contextCallbackSet){
        return;
    }

    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      menuHandler.showContextMenu();
      contextCallbackSet = true;
    }, false);
}

module.exports = {
    configureDefaults: function(window){
        this.window = window;
        this.setTopMenu(topMenuTemplate);
        this.setContextMenu(contextMenuTemplate);
        configureContextMenuCallback(window);
    },
    setTopMenu: function(topMenuTemplate){
        var tt = Menu.buildFromTemplate(topMenuTemplate);
        Menu.setApplicationMenu(tt);
    },
    setContextMenu: function(contextMenuTemplate){
        contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
    },
    showContextMenu: function(){
        contextMenu.popup(remote.getCurrentWindow());
    }
}

/*
module.exports = {
    contextMenu: [{
        label: 'Window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
        }, {
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
        }]
    }],
    mainMenu: [{
        label: 'Electron',
        submenu: [{
            label: 'About Electron',
            selector: 'orderFrontStandardAboutPanel:'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
        }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:'
        }, ]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
        }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
        }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
        }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() {
                remote.getCurrentWindow().reload();
            }
        }, {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function() {
                remote.getCurrentWindow().toggleDevTools();
            }
        }, ]
    }, {
        label: 'Window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
        }, {
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
        }]
    }, {
        label: 'Help',
        submenu: []
    }]
}*/
