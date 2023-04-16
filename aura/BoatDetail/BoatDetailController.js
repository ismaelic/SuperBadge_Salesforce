({
    doInit : function (component, event, helper) {
        //Check if environment allows force:navigateToSObject event. Set showOnFullDetailsButton conditionally.
        component.set('v.showOnFullDetailsButton', $A.get("e.force:navigateToSObject"));
    },
    onFullDetails : function (component, event, helper) {
        //Create a new force:navigateToSObject event instance. Set the boat id and detail view as parameters. Fire the event.
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get('v.boat').Id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
})