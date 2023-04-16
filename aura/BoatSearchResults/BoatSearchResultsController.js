({
    doSearch : function (component, event, helper) {
        component.set('v.ready', false);
        //Get boatTypeId from search method params
        var params = event.getParam('arguments');
        //If params exist set boatTypeId in aura attribute and call helper onSearch method
        if (params) {
            var boatTypeId = params.boatTypeId;
            component.set('v.boatTypeId', boatTypeId);
            helper.onSearch(component, event, helper);
        }
    },
    onBoatSelect : function (component, event, helper) {
        //Get boatId parameter from event
        var boatId = event.getParam('boatId');
        //Set the boat if to v.selectedBoatId
        component.set('v.selectedBoatId', boatId);
        console.log(component.get('v.selectedBoatId'));
    },
})