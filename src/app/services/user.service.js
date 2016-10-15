(function() {
    'use strict';

    angular
        .module('gazingpensive')
        .service('userService', userService);

    /** @ngInject */
    function userService($scope, $firebaseAuth, $log) {

        var auth = $firebaseAuth();

        return {
            signIn: signIn,
            createUser: createUser,
            signOut: signOut
        };

        function signIn(email, password) {
            return auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                $log.log("Signed in as:", firebaseUser.uid);
            }).catch(function(error) {
                $log.error("Authentication failed:", error);
            });
        }

        function createUser(email, password){
            var userRef = firebase.database().ref().child('users')

            return auth.$createUserWithEmailAndPassword(email, password)
                .then(function(firebaseUser) {
                    $log.log("User " + firebaseUser.uid + " created successfully!");
                    userRef.push().set(firebaseUser.uid)
                }).catch(function(error) {
                    $log.error("Error: ", error);
                });
        }

        function signOut(){
            auth.$signOut()
        }
    }
}());