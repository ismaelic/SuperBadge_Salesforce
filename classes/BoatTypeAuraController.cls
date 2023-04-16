public with sharing class BoatTypeAuraController {

    @AuraEnabled
    public static List<BoatType__c> getBoatTypeNames() {
        List<BoatType__c> BoatTypeNames = new List<BoatType__c>();
        BoatTypeNames = [SELECT Name FROM BoatType__c ORDER BY Name];
        return BoatTypeNames;
    }

}