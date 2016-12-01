(function () {

    angular.module('myDemoApp').factory('customerFactory', customerFactory);

    customerFactory.$inject = ['$http'];

    function customerFactory($http){

        var customerFactory = {};

        //API URL
        customerFactory.apiHost = "http://localhost:5053/";
        customerFactory.customerApiPath = "api/customer";

        //FUNCTIONS
        customerFactory.getCustomerList = getCustomerList;
        customerFactory.updateCustomer  = updateCustomer;


        //GET CUSTOMER LIST
        function getCustomerList(){
            return $http({
                url: customerFactory.apiHost + customerFactory.customerApiPath ,
                method: 'GET'
            });
        }

        //UPDATE CUSTOMER
        function updateCustomer(customer){
            return $http({
                method: 'PUT',
                url: customerFactory.apiHost + customerFactory.customerApiPath,
                data: JSON.stringify(customer),
                headers: {'Content-Type': 'application/json'}
            });
        }

        return customerFactory;
    }

})();
