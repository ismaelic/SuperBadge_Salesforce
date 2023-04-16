({
    getBoatTypeNames : function(component) {
        //Set Action Name on Aura Controller and its parameters
        var actionName = 'getBoatTypeNames';
        var params = {};

        //Call N3Service apexRequest method, define response handler, and catch handler
        this.apexRequest(component, actionName, params)
            .then(this.handleGetBoatTypeNamesResponse(component))
            .catch(this.handleError(component));

	},
    handleGetBoatTypeNamesResponse : function (component) {
        return $A.getCallback(function (response) {
            console.log(response)
            //Set Boat Type Names in aura attribute
            var boatTypes = response;
            component.set('v.boatTypes', boatTypes)
            console.log(component.get('v.boatTypes'))
        }.bind(this));
    },
    handleError : function (component) {
        return $A.getCallback(function (error) {
            //Log error and display toast
            console.log(error);
            var opts = {
                title : 'Boat Search Form',
                message : error,
                type : 'error'
            }
            this.displayToast(opts)
        }.bind(this));
    },
})