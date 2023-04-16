({
    onBoatClick : function (component, event, helper) {

        //Get the boat tile selected
        var boat = component.get('v.boat');
        //Get the Id from the boat tile selected
        var boatId = boat.Id;

        //Create an instance of the BoatSelect event. Pass boatIs as a parameter. Fire the event.
        var BoatSelectEvent = component.getEvent('BoatSelect');
        BoatSelectEvent.setParams({
            boatId : boatId,
        });
        BoatSelectEvent.fire();

        //Create an instance of the BoatSelected event. Pass boat as a parameter. Fire the event.
        var BoatSelectedEvent = $A.get('e.c:BoatSelected');
        BoatSelectedEvent.setParams({
            boat : boat,
        });
        BoatSelectedEvent.fire();

        //Get boat name, latitude, and longitude. Pass data as parameters. Fire the event.
        var label = boat.Name;
        var lat = boat.Geolocation__latitude__s;
        var long = boat.Geolocation__longitude__s;
        var PlotMapMarkerEvent = $A.get("e.c:PlotMapMarker");
        PlotMapMarkerEvent.setParams({
            'sObjectId' : boatId,
            'lat' : lat,
            'long' : long,
            'label' : label
        });
        PlotMapMarkerEvent.fire();
    },
})