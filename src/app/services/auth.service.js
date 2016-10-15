(function () {
    'use strict';
    angular.module('gazingpensive')

        .factory('authService', authService);

    /** @ngInject **/
    function authService($log, $firebaseAuth, $state, moment, $q) {

        var ref = firebase.database().ref();
        var authSession = $firebaseAuth();
        var storageRef = firebase.storage().ref();
        var defaultPhotoURL = "https://firebasestorage.googleapis.com/v0/b/labeinstein.appspot.com/o/images%2Feinstein.png?alt=media&token=970b846b-ed63-48a1-999b-7a4e944d38d9";

        var service = {
            checkAuthSession: checkAuthSession,
            signIn: signIn,
            signOut: signOut,
            createUser: createUser,
            currentUser: currentUser,
            uploadImage: uploadImage
        };

        return service;

        function checkAuthSession() {
            return authSession.$requireSignIn();
        }

        function signIn(email, password) {
            authSession.$signInWithEmailAndPassword(email, password)
                .then(function (auth) {
                    $log.debug("User " + auth.uid + " signin successfully!");
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $log.debug(errorCode, errorMessage);
                    // ...
                });
        }

        function signOut() {
            authSession.$signOut();
        }

        function createUser(email, password) {
            authSession.$createUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    ref.child('users').child(firebaseUser.uid).set({
                        email: email,
                        dateRegistered: moment.utc().valueOf()
                    });
                    signIn(email, password);
                    $log.debug("User " + firebaseUser.uid + " created successfully!");
                    return firebaseUser.uid;
                    // $state.go('admin');
                }).catch(function (error) {
                    if (error) {
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                $log.debug("Error email in use:", error);
                                break;
                            case "auth/invalid-email":
                                $log.debug("Error invalid email:", error);
                                break;
                            default:
                                $log.debug("Error creating user:", error);
                        }
                    }
                });
        }

        function currentUser() {
            var deferred = $q.defer();
            var user = firebase.auth().currentUser;
            if (user != null) {
                // get the date of registeration
                ref.child('users').child(user.uid).once('value').then(function (snapshot) {
                    var userInfo = {
                        name: user.displayName || user.email.split("@")[0],
                        email: user.email,
                        photoUrl: user.photoURL || defaultPhotoURL,
                        created: moment(snapshot.dateRegistered).format("YYYY MMMM")
                    };
                    deferred.resolve(userInfo);
                });
            }
            return deferred.promise;
        }

        function updateUserProfileImage(url) {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                photoURL: url
            }).then(function () {
                $log.debug("Profile updated with image: ", url);
            }, function (error) {
                $log.debug(error);
            });
        }

        function uploadImage(file) {
            var deferred = $q.defer();
            var uploadTask = storageRef.child('images/' + file.name).put(file);
            uploadTask.on('state_changed', function (snapshot) {
                // Observe state change events such as progress, pause, and resume
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $log.debug('Upload is ' + progress + '% done');
            }, function (error) {
                // Handle unsuccessful uploads
                deferred.reject(error);
                $log.debug(error);
            }, function () {
                // Handle successful uploads on complete
                var downloadURL = uploadTask.snapshot.downloadURL;
                updateUserProfileImage(downloadURL);
                setUserImage(downloadURL);
                deferred.resolve(downloadURL);
            });
            return deferred.promise;
        }

        function setUserImage(url) {
            var currentUserInfo = firebase.auth().currentUser;
            ref.child('users').child(currentUserInfo.uid).child('photoURL').set(url);
            ref.child('images').child(currentUserInfo.uid).set({
                photoURL: url,
                createdAt: moment.utc().valueOf()
            });
        }


    }

})();
