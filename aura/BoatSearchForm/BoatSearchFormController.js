({
    doInit : function(component, event, helper) {
        //Checks if 'e.force:createRecord' function exists and displays 'New' button conditionally
        component.set('v.renderNewButton', $A.get('e.force:createRecord'));
        //Call to helper
		helper.getBoatTypeNames(component);
	},
    onNew : function (component, event, helper) {
        //Set Boat Type Id selected from Boat Type drop-down
        var boatTypeId = component.get('v.boatType');
        //Create a new instance of e.force:createRecord
        var createNewBoatEvent = $A.get('e.force:createRecord');

        //If Id is not empty, Create a new instance of e.force:createRecord
        if(!$A.util.isEmpty(boatTypeId)) {
            createNewBoatEvent.setParams({
                'entityApiName': 'Boat__c',
                'defaultFieldValues' : {
                    'BoatType__c': boatTypeId
                }
            });
            createNewBoatEvent.fire();
        // Else, log the error
        } else {
            console.log('There was not found any Boat Type Id')
        }
    },
    onSelectChange : function (component, event, helper) {
        //Get the value of option in Boat Type drop-down and set it in attribute
        var boatType = component.find('boatTypesSelect').get('v.value')
        component.set('v.boatType', boatType);
        console.log(component.get('v.boatType'));
    },
    onFormSubmit : function (component, event, helper) {
        // Get the component event by using the name value from aura:registerEvent
        var boatTypeId = component.get('v.boatType');
        var formsubmit = component.getEvent("formsubmit");
        //Set boatTypeId as a paremeter
        formsubmit.setParams({
            'formData' : {
                'boatTypeId' : boatTypeId
            }
        });
        //Fire the event
        formsubmit.fire();
    },
})