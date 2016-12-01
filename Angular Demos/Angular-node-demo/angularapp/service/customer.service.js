(function () {

    angular.module('myDemoApp').service('customerService', customerService);

    customerService.$inject = ['$http'];

    function customerService($http) {

        var vm = this;

        //API URL
        vm.apiHost = "http://localhost:5053/";
        vm.customerApiPath = "api/customer";

        //FUNCTIONS
        vm.deleteCustomerService = deleteCustomerService;

        function deleteCustomerService(parameter) {
            var request = $http({
                method: "delete",
                url: vm.apiHost + vm.customerApiPath,
                data: JSON.stringify(parameter),
                headers: {'Content-Type': 'application/json'}
            });
            return request;
        }
    }

})();
