({
    doInit : function (component, event, helper) {
        //Call helper onInit
        helper.onInit(component, event, helper);
    },
    onSave : function (component, event, helper) {
        //When Save button is fired, call force:recordData saveRecord method
        //and display toasts/alerts depending on response
        component.find('service').saveRecord(function (saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var reviewAddedEvent = component.getEvent('BoatReviewAdded');
                reviewAddedEvent.fire();

                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast) {
                    resultsToast.setParams({
                        'title': 'Boat Review',
                        'message': 'Boat Review saved successfully!',
                        'type': 'Success',
                    });
                    resultsToast.fire();
                } else {
                    alert('Boat Review saved successfully!');
                }
            } else if (saveResult.state === "INCOMPLETE") {
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast) {
                    resultsToast.setParams({
                        'title': 'Boat Review',
                        'message': 'User is offline, device doesn\'t support drafts',
                        'type': 'info',
                    });
                    resultsToast.fire();
                } else {
                    alert('User is offline, device doesn\'t support drafts');
                }

            } else if (saveResult.state === "ERROR") {
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast) {
                    resultsToast.setParams({
                        'title': 'Boat Review',
                        'message': 'Problem saving review, error: ' + JSON.stringify(saveResult.error),
                        'type': 'error',
                    });
                    resultsToast.fire();
                } else {
                    alert('Problem saving review, error: ' + JSON.stringify(saveResult.error));
                }

            } else {
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast) {
                    resultsToast.setParams({
                        'title': 'Boat Review',
                        'message': 'Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error),
                        'type': 'error',
                    });
                    resultsToast.fire();
                } else {
                    alert('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            }

        })
    },
    onRecordUpdated : function (component, event, helper) {
        //Handle recordUpdated force:recordData event with toast/alert
        var recordUpdatedToast = $A.get("e.force:showToast");
        if(recordUpdatedToast) {
            recordUpdatedToast.setParams({
                'title': 'Boat Review',
                'message': 'Boat Review has been updated!',
                'type': 'Success',
            });
            recordUpdatedToast.fire();
        } else {
            alert('Boat Review has been updated!');
        }
    },
})