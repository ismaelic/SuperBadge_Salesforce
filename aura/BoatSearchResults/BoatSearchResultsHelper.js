({
    onSearch : function(component, event, helper) {
        /*
        //Not using apexRequest method because it fails when
        //validating in Trailhead Check Challenge

        var actionName = "getBoats";
        var params = {
            boatTypeId : component.get('v.boatTypeId')
        };

        this.apexRequest(component, actionName, params)
            .then(this.handleOnSearchResponse(component))
            .catch(this.handleError(component))
        */

        //Call to Apex Aura Controller using getBoats method
        var boatTypeId = component.get('v.boatTypeId');
        var action = component.get('c.getBoats');
        console.log('boatTypeId:', boatTypeId)
        action.setParams({
            boatTypeId : boatTypeId
        });
        action.setCallback(this, function(response) {
            console.log(response)
            if(response.getState() === 'SUCCESS') {
                console.log(response.getReturnValue())

                //Set list of boats in boats attribute
                component.set('v.boats', response.getReturnValue());
                component.set('v.ready', true);
            } else {
                //If error, use handleError method
                this.handleError(component);
            }
        });
        $A.enqueueAction(action);
	},
    /*
    handleOnSearchResponse : function (component) {
        return $A.getCallback(function (response) {
            console.log(response);
            component.set('v.boats', response);
            if($A.util.isEmpty(component.get('v.boats'))) {
                component.set('v.message', 'No boats found');
            }
            console.log(component.get('v.boats'));
        }.bind(this));
    },
    */
    handleError : function (component) {
        return $A.getCallback(function (error) {
            //Log error and display toast
            console.log(error);
            var opts = {
                title : 'Boat Search Result',
                message : error,
                type : 'error'
            };
            this.displayToast(opts)
        }.bind(this));
    },
})