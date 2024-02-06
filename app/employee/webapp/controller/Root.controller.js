sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, ODataModel, Filter, FilterOperator){
    "use strict";
 
    var MyController =  Controller.extend("com.training.employee.controller.Root", {
        onInit: function () { 
            this.Dialog = this.getView().byId("addDialog");
            
        },

        onAddEmployeePress: function () {
            
            this.Dialog.open();
        },

        onAddEmployeeConfirm: function () {
            var sFirstName = this.getView().byId("firstNameInput").getValue();
            var sLastName  = this.getView().byId("lastNameInput").getValue();
            var sJobCode   = this.getView().byId("JobCodeInput").getValue();
            var sId        = this.getView().byId("IdInput").getValue();

            let oPayload = {
                firstName : sFirstName,
                lastName  : sLastName,
                jobCode   : sJobCode,
                ID        : sId
            };
  
           
             console.log("JSON Payload:- ", oPayload); 
             var oModel = this.getView().getModel();

             oModel.create("/Employee",oPayload , {
                success:function() {
                    console.log("Employee added Successfully!!!");
                },
                error: function(oError) {
                    console.log("Error in adding Employee:", oError);
                }
             });

             this.Dialog.close();
        },

        onAddEmployeeCancel: function (){
            this.Dialog.close();
        },
 
        onLiveChange: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.byId("table");
            var oBinding = oTable.getBinding("items");
 
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("jobCode", FilterOperator.Contains, sQuery);
                oBinding.filter([oFilter]);
            } else {
                oBinding.filter([]);
            }
        },
 
        onSort: function () {
            this._bDescendingSort = !this._bDescendingSort;
            var oTable = this.getView().byId("table");
            var oBinding = oTable.getBinding("items");
            var oSorter = new sap.ui.model.Sorter("jobCode", this._bDescendingSort);
            oBinding.sort(oSorter);
            console.log("Sorted");
        },
 
            onDeleteItem: function(oEvent) {
            let oTable = this.getView().byId("table");
            let oItemSelected = oTable.getSelectedItem();
            let oType = oItemSelected.getType();
            console.log(oType);
            let oCell = oItemSelected.getCells();
            console.log(oCell[1]);

            let sId = oCell[1].getUnit();
            console.log(sId);

            var oModel = this.getView().getModel();
            

             oModel.remove(`/Employee(${sId})`, {
                success:function() {
                    console.log("Employee deleted Successfully!!!");
                },
                error: function(oError) {
                    console.log("Error in deleting Employee:", oError);
                }
             });
            
        },
    
        onListItemPress: function(oEvent) {
             var oItem = oEvent.getSource();
             var oContext = oItem.getBindingContext();
             console.log("Employee ID: ", oContext.getProperty("ID"));
             var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
             oRouter.navTo("RouteDetails", {
                Id : oContext.getProperty("ID")
            });
        }  
    });
    return MyController;
});