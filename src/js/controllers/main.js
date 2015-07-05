angular.module('noteController', [])

	.controller('MainController', ['$scope','$http','Notes', function($scope, $http, Notes) {
		$scope.formData = {};
		$scope.loading = true;

		Notes.get()
			.success(function(data) {
				$scope.notes = data;
				$scope.loading = false;
			});

		$scope.createNote = function() {

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Notes.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.notes = data;
					});
			}
		};

		// DELETE ==================================================================
		$scope.deleteNote = function(id) {
			$scope.loading = true;

			Notes.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.notes = data;
				});
		};
	}]);