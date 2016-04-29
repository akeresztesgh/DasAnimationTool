
var remote = require('remote');
var dialog = remote.require('dialog');

module.exports = {
    openImages: function(){
        console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));
    },
    saveProjet: function(){
        
    }
}
