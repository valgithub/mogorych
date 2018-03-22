

function Click(){
	this.handlers = [];
}
Click.prototype = {
	subscribe: function(fn){
		this.handlers.push(fn)
	},
	fire: function(msg, thisObj){
		var scope = thisObj || window;
		this.handlers.forEach(function(item, i){
			item.call(scope, msg)
		})
	},
	unscribe: function (fn){
		this.handlers = this.handlers.filter(function(fn){
			if(item !== fn){
				return item
			}
		})
	}
}


function Component(name){
	this.name = name;
	this.chatroom = null;
};

Component.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function(message, from) {
    	this.onRecive.apply(this, arguments)
    }
};


/**
* @param {object} proto  - initial module object
*/

function Module(proto){
    var proto = proto
	var module = new Component();
	for(var param in proto){
		module[param] = proto[param]
	}
  	return module
};

var Room = function() {
    var participants = {};

    return {

        register: function(participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },

        send: function(message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);
            } else {                       // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};
