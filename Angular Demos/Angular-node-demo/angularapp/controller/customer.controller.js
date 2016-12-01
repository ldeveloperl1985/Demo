(function () {
    angular.module('myDemoApp').controller('customerController', customerController);

    customerController.$inject = ['$scope', '$http', '$uibModal', '$window', 'customerFactory', 'customerService'];

    function customerController($scope, $http, $uibModal, $window, customerFactory, customerService) {

        var vm = this;
        vm.uibModalInstance = '';
        vm.customerApiURL = 'http://localhost:5053/api/customer';
        vm.customerData = [];


        //---------DB FUNCTIONS
        vm.deleteCustomer = deleteCustomer;
        vm.addCustomer = addCustomer;
        vm.getAllCustomer = getAllCustomer;
        vm.updateCustomer = updateCustomer;

        //---------UIB MODAL POPUP FUNCTIONS
        vm.openModal = openModal;
        vm.addModal = addModal;
        vm.editModal = editModal;
        vm.deleteModal = deleteModal;
        //---------UIB MODAL BUTTONS
        vm.okBtn = okBtn;
        vm.cancelBtn = cancelBtn;


        function addCustomer() {
            //---------DB COMMUNICATION WITHOUT FACTORY OR SERVICE
            $http({
                method: 'POST',
                url: vm.customerApiURL,
                data: JSON.stringify(vm.newuser),
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (response) {
                    console.log("data" + JSON.stringify(response));
                    vm.cancelBtn();
                    vm.newuser.customerId = response[0].customerId;
                    vm.customerData.push(vm.newuser);
                })
                .error(function (response) {
                    console.log('Error: ' + response);
                });

        }

        function getAllCustomer() {
            //---------DB COMMUNICATION WITHOUT FACTORY
            /*  $http.get(vm.customerApiURL)
             .success(function (response) {
             vm.customerData = response;
             })
             .error(function (response) {
             console.log('Error: ' + response);
             });*/

            //---------DB COMMUNICATION WITH FACTORY
            customerFactory.getCustomerList().success(function (response) {
                vm.customerData = response;
            }).error(function (response) {
                console.log('Error: ' + response);
            });

        }

        function updateCustomer() {

            //---------DB COMMUNICATION WITHOUT FACTORY
            /* $http({
             method: 'PUT',
             url: vm.customerApiURL,
             data: JSON.stringify(vm.newuser),
             headers: {'Content-Type': 'application/json'}
             })
             .success(function (response) {
             vm.cancelBtn();
             vm.customerData.map(function (item, index) {
             if (item.customerId == vm.newuser.customerId) {
             vm.customerData[index] = vm.newuser;
             return;
             }
             })
             })
             .error(function (response) {
             console.log('Error: ' + response);
             });*/

            //---------DB COMMUNICATION WITH FACTORY
            customerFactory.updateCustomer(vm.newuser).success(function (response) {
                vm.cancelBtn();
                vm.customerData.map(function (item, index) {
                    if (item.customerId == vm.newuser.customerId) {
                        vm.customerData[index] = vm.newuser;
                        return;
                    }
                })
            }).error(function (response) {
                console.log('Error: ' + response);
            });
        }

        function deleteCustomer(index) {
            var customerToDelete = vm.customerData[index];
            var postData = {
                "customerId": customerToDelete.customerId
            }

            //---------DB COMMUNICATION WITHOUT FACTORY
            /* $http({
             method: 'DELETE',
             url: vm.customerApiURL,
             data: JSON.stringify(postData),
             headers: {'Content-Type': 'application/json'}
             })
             .success(function (response) {
             vm.customerData.splice(index, 1);
             })
             .error(function (response) {
             console.log('Error: ' + response);
             });*/


            //---------DB COMMUNICATION WITH SERVICE
            customerService.deleteCustomerService(postData).then(function (response) {
                vm.customerData.splice(index, 1);
            }, function (response) {
                console.log('Error: ' + response);
            });

            /*  customerService.deleteCustomer(postData).success(function (response) {
             vm.customerData.splice(index, 1);
             }).error(function (response) {
             console.log('Error: ' + response);
             });*/


        }

        function addModal() {
            vm.newuser = '';
            vm.editFlag = false;
            vm.openModal();
        }

        function editModal(item) {
            vm.editFlag = true;
            vm.newuser = angular.copy(item);
            vm.openModal();
        }

        function deleteModal(item) {
            if ($window.confirm('Are you sure want to delete?')) {
                vm.deleteCustomer(item);
            }
        }

        //--------------------UIB MODAL
        function openModal() {
            uibModalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                templateUrl: 'manageCustomer.html',
                size: 'lg',
                controller: 'customerController',
                scope: $scope
            });
        }

        function okBtn() {
            if (vm.editFlag) {
                vm.updateCustomer()
            }
            else {
                vm.addCustomer();
            }
        }

        function cancelBtn() {
            uibModalInstance.dismiss('cancel');
        }

        //--------------------UIB MODAL


        //---------INIT FUNCTION
        function init() {
            vm.getAllCustomer();
        }

        init();

    }
})();