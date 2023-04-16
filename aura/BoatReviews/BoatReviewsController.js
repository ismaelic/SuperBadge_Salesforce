({
    doInit : function (component, event, helper) {
        //Call helper
        helper.onInit(component, event, helper);
    },
    onUserInfoClick : function (component, event, helper) {
        //Get the user id from data attribute
        //Set the user id and page type as parameters
        //Fire the navigation event
        var userId = event.currentTarget.getAttribute('data-userid');
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            'recordId' : userId,
            'slideDevName': 'detail'
        });
        navEvt.fire();
    },
})