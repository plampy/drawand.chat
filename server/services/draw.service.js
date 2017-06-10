const inMem = require('../in-mem');

const maxDrawHistory = 1024 * 50

module.exports = {
    pushDrawAction: function(drawAction){
        inMem.drawActions.push(drawAction);
        if(inMem.drawActions.length > maxDrawHistory){
            inMem.drawActions = inMem.drawActions.slice(-maxDrawHistory);
        }
    },
    getDrawActions: function() {
        return inMem.drawActions.slice(-maxDrawHistory);
    }
}