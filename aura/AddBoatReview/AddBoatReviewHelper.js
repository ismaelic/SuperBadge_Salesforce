({
    onInit : function (component, event, helper) {
        //Instantiate variables to be used within getNewRecord
        var objectApiName = 'BoatReview__c';
        var recordTypeId = null;
        var skipCache = false;

        //Call force:recordData getNewRecord method
        //If error or empty boat review console an error
        //Otherwise, set boat lookup in boat review with the selected boat id
        var service = component.find('service');
        service.getNewRecord(
            objectApiName,
            recordTypeId,
            skipCache,
            $A.getCallback(function () {
                var boatReview = component.get('v.boatReview');
                var recordError = component.get('v.recordError');
                if (recordError || boatReview === null) {
                    console.log('Error initializing review template: ' + recordError);
                } else {
                    boatReview.Boat__c = component.get('v.boat').Id;
                    component.set('v.boatReview', boatReview);
                }
            })
        )
    },
})