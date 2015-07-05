angular.module('noteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Notes', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/notes');
			},
			create : function(note) {
				return $http.post('/api/notes', note);
			},
			delete : function(id) {
				return $http.delete('/api/notes/' + id);
			}
		}
	}]);