sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.training.employee.controller.Details",{
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDetails").attachPatternMatched(this.RouteMatched, this);
        },
            RouteMatched: function(oEvent) {     
            var oArgs = oEvent.getParameter("arguments");
            var sID = oArgs.Id;
            const oView = this.getView().byId("employeePage");
            console.log(oView);
            oView.bindElement({
                path: `/Employee(${sID})`
            });
        }
        
    });
});



 // var oServiceUrl = "http://localhost:4004/odata/v4/catalog/Employee";
            // var oModel = new sap.ui.model.json.JSONModel(oServiceUrl);
            // this.getView().setModel(oModel);
