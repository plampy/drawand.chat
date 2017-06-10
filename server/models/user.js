const User = (function(){

    function User (data){
        data = data || {};
        this.id = data.id || "";
        this.username = data.username || ""
        this.x = data.x || 0;
        this.y = data.y || 0;
        this.lastDrawAction = data.lastDrawAction || null;
        this.chipColor = data.chipColor || null;
        this.active = data.active || false;
        this.socket = data.socket || null;
    }

    User.prototype.getClientSafeProperties = function (){
        return {
            id: this.id,
            username: this.username,
            x: this.x,
            y: this.y,
            lastDrawAction: this.lastDrawAction,
            chipColor: this.chipColor,
            active: this.active
        }
    }

    //Static functions
    User.create = function(data){
        return new User(data);
    }

    return User;
})()



module.exports = User;