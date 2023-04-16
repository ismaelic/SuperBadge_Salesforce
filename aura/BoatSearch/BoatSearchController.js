({
    onFormSubmit : function (component, event, helper) {
        //Retrieve the boatTypeId from event
        var boatTypeId = event.getParam('formData').boatTypeId;
        //Find search method from c:BoatSearchResults and pass the boatTypeId
        var BoatSearchResults = component.find('BoatSearchResults');
        BoatSearchResults.search(boatTypeId);
    },
})