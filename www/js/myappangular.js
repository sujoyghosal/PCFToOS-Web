var app = angular.module("myApp", [
  "ngRoute",
  "ui.bootstrap",
  "ui.directives",
  "ui.filters",
  "ui-notification",
  "720kb.socialshare",
]);
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "Chat2.html",
        //templateUrl: "Login.html",
        controller: "ChatCtrl",
        isLogin: true,
      })
      .when("/home", {
        templateUrl: "Chat2.html",
        controller: "ChatCtrl",
      })
      .when("/register", {
        templateUrl: "Register.html",
        controller: "ChatCtrl",
      })
      .when("/updateuser", {
        templateUrl: "UpdateProfile.html",
        controller: "ChatCtrl",
      })
      .when("/updatepassword", {
        templateUrl: "UpdateProfile.html",
        controller: "ChatCtrl",
      })
      .when("/signup", {
        templateUrl: "Register.html",
        controller: "ChatCtrl",
      })
      .when("/getdonation", {
        //templateUrl: "ListDonations.html",
        templateUrl: "ViewOffers.html",
        controller: "ChatCtrl",
      })
      .when("/donationsaccepted", {
        templateUrl: "MyPickupList.html",
        controller: "ChatCtrl",
      })
      .when("/offerdonation", {
        templateUrl: "OfferDonation.html",
        controller: "ChatCtrl",
      })
      .when("/offershistory", {
        templateUrl: "MyOffers.html",
        controller: "ChatCtrl",
      })
      .when("/createneed", {
        templateUrl: "CreateNeed.html",
        controller: "ChatCtrl",
      })
      .when("/myneeds", {
        templateUrl: "MyNeeds.html",
        controller: "ChatCtrl",
      })
      .when("/createemergency", {
        templateUrl: "CreateEmergency.html",
        controller: "ChatCtrl",
      })
      .when("/viewneeds", {
        templateUrl: "NeedsNearby.html",
        controller: "ChatCtrl",
      })
      .when("/viewemergencies", {
        templateUrl: "ViewEmergencies.html",
        controller: "ChatCtrl",
      })
      .when("/settings", {
        templateUrl: "settings.html",
        controller: "ChatCtrl",
      })
      .when("/subscribe", {
        templateUrl: "Subscribe2.html",
        controller: "ChatCtrl",
      })
      .when("/sendnotification", {
        templateUrl: "SendPush.html",
        controller: "ChatCtrl",
      })
      .when("/notifications", {
        templateUrl: "Notifications.html",
        controller: "ChatCtrl",
      })
      .when("/eventsnearby", {
        templateUrl: "MyNearbyEvents.html",
        controller: "ChatCtrl",
      })
      .when("/resetpw", {
        templateUrl: "ResetPassword.html",
        controller: "ChatCtrl",
      })
      .when("/index", {
        templateUrl: "index.html",
        controller: "ChatCtrl",
      })
      .when("/contactus", {
        templateUrl: "ContactUs.html",
        controller: "ChatCtrl",
      })
      .otherwise({
        redirectTo: "/login",
      });
  },
]);
app.config([
  "socialshareConfProvider",
  function configApp(socialshareConfProvider) {
    socialshareConfProvider.configure([
      {
        provider: "twitter",
        conf: {
          url: "http://720kb.net",
          text: "720kb is enough",
          via: "npm",
          hashtags: "angularjs,socialshare,angular-socialshare",
          trigger: "click",
          popupHeight: 800,
          popupWidth: 400,
        },
      },
      {
        provider: "facebook",
        conf: {
          url: "http://720kb.net",
          popupHeight: 1000,
          popupWidth: 1000,
        },
      },
      //and so on ...
      {
        provider: "google",
        conf: {
          url: "http://720kb.net",
          trigger: "mouseover",
          popupHeight: 900,
          popupWidth: 700,
        },
      },
      {
        provider: "linkedin",
        conf: {
          url: "http://720kb.net",
          trigger: "mouseover",
          popupHeight: 900,
          popupWidth: 700,
        },
      },
    ]);
  },
]);
app.service("DataService", function () {
  var stringConstructor = "test".constructor;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;
  var response = "";

  function whatIsIt(object) {
    if (object === null) {
      response = "null";
      return response;
    } else if (object === undefined) {
      response = "undefined";
      return response;
    } else if (object.constructor === stringConstructor) {
      response = "String";
      return response;
    } else if (object.constructor === arrayConstructor) {
      response = "Array";
      return response;
    } else if (object.constructor === objectConstructor) {
      response = "Object";
      return response;
    } else {
      response = "don't know";
      return response;
    }
  }

  function isValidArray(object) {
    whatIsIt(object);
    if (response === "Array") return true;
    else return false;
  }

  function isValidObject(object) {
    whatIsIt(object);
    if (response === "Object") return true;
    else return false;
  }

  function isNull(object) {
    whatIsIt(object);
    if (response === "null") return true;
    else return false;
  }

  function isString(object) {
    whatIsIt(object);
    if (response === "String") return true;
    else return false;
  }

  function isUnDefined(object) {
    whatIsIt(object);
    if (response === "don't know" || response === "undefined") return true;
    else return false;
  }
  return {
    whatIsIt: whatIsIt,
    isValidArray: isValidArray,
    isValidObject: isValidObject,
    isNull: isNull,
    isString: isString,
    isUnDefined: isUnDefined,
  };
});

app.service("UserService", function () {
  var loggedinUser = {};
  var isLoggedIn = false;
  var setLoggedIn = function (newObj) {
    loggedinUser = newObj;
    //       console.log("New User = " + JSON.stringify(loggedinUser));
  };

  var getLoggedIn = function () {
    return loggedinUser;
  };

  var setLoggedInStatus = function (state) {
    isLoggedIn = state;
  };
  var getLoggedInStatus = function () {
    return isLoggedIn;
  };
  return {
    setLoggedIn: setLoggedIn,
    getLoggedIn: getLoggedIn,
    setLoggedInStatus: setLoggedInStatus,
    getLoggedInStatus: getLoggedInStatus,
  };
});

var BASEURL_BLUEMIX = "https://freecycleapissujoy.mybluemix.net";
var BASEURL_LOCAL = "http://localhost:8080";
var BASEURL_DOCKER = "http://localhost:49155";
var BASEURL_PIVOTAL = "http://freecycleapissujoy-horned-erasure.cfapps.io";
var BASEURL_PERSONAL = "https://freecycleapi.mybluemix.net";
var BASEURL_GCP = "http://34.131.27.98:5555";
var BASEURL_OS = "https://pcf-to-os-api-concession-kiosk.pcf-to-ocp-migration-c6c44da74def18a795b07cc32856e138-0000.us-south.containers.appdomain.cloud";

var BASEURL = BASEURL_OS;
var socket = null;
var GEOCODEURL =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwQOPx91fjj06kDNq7hjkT-ZSxkQFtJPA";
//"http://api.positionstack.com/v1/forward?access_key=cff8960a5b6a7fde5eac5d20b3d16295";

app.controller(
  "ChatCtrl",
  function (
    $scope,
    $rootScope,
    $http,
    $filter,
    $location,
    $route,
    $window,
    Notification,
    UserService,
    DataService
  ) {
    $scope.spinner = false;
    $scope.alldonations = false;
    $scope.allneeds = false;
    $rootScope.username = UserService.getLoggedIn().name;
    $scope.citydonations = "";
    $scope.cancel = false;
    $scope.uuid = UserService.getLoggedIn()._id;
    $scope.ID = "blue";
    $scope.settings = adjustsettings(UserService.getLoggedIn().settings);
    $scope.selectedto = undefined;
    $scope.selectedfrom = undefined;
    $scope.login_email = UserService.getLoggedIn().email;
    $scope.login_fullname = UserService.getLoggedIn().name;
    $scope.login_phone = UserService.getLoggedIn().phone;
    $scope.found = "";
    $scope.result = "";
    $scope.groupusers = [];
    $rootScope.chatArray = [];
    $rootScope.myText = null;
    $scope.SpeakButtonLabe = "Click to Speak";
    $scope.reverseSort = false;
    $rootScope.showScanResults = false;
    $rootScope.loggedinUsers = [];
    $scope.synth = window.speechSynthesis;
    $scope.rate = 1;
    $scope.pitch = "1";
    $scope.targetLang = "hi-IN";
    $rootScope.scanData = "";
    $scope.SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    $scope.SpeechGrammarList =
      SpeechGrammarList || window.webkitSpeechGrammarList;
    $scope.SpeechRecognitionEvent =
      SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    $scope.recognition = new SpeechRecognition();
    if (SpeechGrammarList) {
      // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
      // This code is provided as a demonstration of possible capability. You may choose not to use it.
      var speechRecognitionList = new SpeechGrammarList();
      var grammar =
        "#JSGF V1.0; grammar colors; public <color> = " +
        colors.join(" | ") +
        " ;";
      speechRecognitionList.addFromString(grammar, 1);
      $scope.recognition.grammars = speechRecognitionList;
    }
    $scope.recognition.continuous = false;
    $scope.recognition.lang = "bn-IN";
    //recognition.lang = "en-US";
    $scope.recognition.interimResults = false;
    $scope.recognition.maxAlternatives = 1;
    $scope.targetLang = "th";
    $scope.event_receive = {
      max_distance: 0,
      lng: 0,
      lat: 0,
    };
    //$rootScope.eventsCount = 0;
    $rootScope.mobileDevice = false;
    $scope.events = [];
    var today = new Date().toISOString().slice(0, 10);
    $rootScope.lastUUID = "";
    $scope.today = {
      value: today,
    };
    $scope.maxDate = {
      value: new Date(2015, 12, 31, 14, 57),
    };
    $scope.isMobileDevice = function () {};
    $rootSocket = null;
    $scope.isVisible = function () {
      /*return ("/login" !== $location.path() && "/signup" !== $location.path() &&
            "/resetpw" !== $location.path() && "/updatepassword" !== $location.path());*/
      return true;
    };
    $rootScope.$on("CallGetEventsMethod", function () {
      $scope.GetEventsForUser(true);
    });
    $rootScope.$on("CallSetupWebSocketsMethod", function () {
      $scope.setupWebSockets("init", null);
    });
    $rootScope.$on("CallCreateRoomsMethod", function () {
      createRooms();
    });
    $rootScope.$on("$routeChangeStart", function (event, next) {
      if (
        !UserService.getLoggedInStatus() &&
        "/signup" != $location.path() &&
        "/resetpw" != $location.path()
        /*&&
        ("/offerdonation" === $location.path() ||
          "/subscribe" === $location.path() ||
          "/notifications" === $location.path() ||
          "/updatepassword" === $location.path() ||
          "/createneed" === $location.path() ||
          "/createemergency" === $location.path() ||
          "/offershistory" === $location.path())*/
      ) {
        //console.log("User not logged in for access to " + $location.path());
        /* You can save the user's location to take him back to the same page after he has logged-in */
        //$rootScope.savedLocation = $location.path();
        $location.path("/login");
        return;
      }
      if (UserService.getLoggedInStatus() && "/login" == $location.path()) {
        $location.path("/home");
        return;
      }
    });



    //Google
    $scope.events = [];
    $scope.setupWebSockets = function (purpose, arg) {
      socket = io(BASEURL, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });
      socket.on("connect", () => {
        console.log("Connected to WebSocket server..socket id " + socket.id); // x8WIv7-mJelg7on_ALbx
        /*console.log(
          "Creating rooms for subscribed events: " +
            JSON.stringify($rootScope.subscribed_events)
        );*/
        createRoom($scope.login_email);
        socket.emit("send-login", {
          userInfo: UserService.getLoggedIn(),
        });
      });
      socket.on("loggedin-users", (data) => {
        $rootScope.loggedinUsers = data.currentUsers;
        //$route.reload();
      });
      socket.on("new-loggedin-user", (data) => {
        var newUser = data.newUser;
        var found = false;
        for (i = 0; i < $rootScope.loggedinUsers.length; i++) {
          if ($rootScope.loggedinUsers[i].email == newUser.email) {
            found = true;
            break;
          }
        }
        if (!found) {
          console.log(
            "New User has logged in, refreshing users list with " + newUser.name
          );
          $rootScope.loggedinUsers.push(newUser);
        }
        //$route.reload();
      });
      //var socket = io("http://localhost:5555");
      socket.on("event", (data) => {
        console.log("Received server event named 'event'");
      });
      socket.on("new-scan", (data) => {
        $rootScope.showScanResults = true;
        Notification.info({
          message: "New Scan Data Arrived", //JSON.stringify(data),
          title: "New Scan",
          positionY: "bottom",
          positionX: "center",
          delay: 50000,
          replaceMessage: true,
        });
        console.log("Event received from server : " + JSON.stringify(data));
        $rootScope.myText = data.eventDetails.results;
        $rootScope.context_email = data.eventDetails.email;
        $rootScope.context_time = data.eventDetails.time_created;
        $rootScope.context_type = data.eventDetails.event_type;
        $rootScope.context_source_type = data.eventDetails.file_type;
        $rootScope.context_file_number = data.eventDetails.file_number;
        $rootScope.context_deps_count =
          data.eventDetails.results.count_of_dependencies;
        $rootScope.context_envvars_count =
          data.eventDetails.results.env_vars_count;
        $rootScope.context_vcap_envvars_count =
          data.eventDetails.results.vcap_env_vars_count;
      });

      socket.on("disconnect", () => {
        socket.removeAllListeners();
        console.log("Disconnected socket...."); // undefined
        console.log(
          "Detected server close event, reconnecting to server in 5 seconds"
        );
        setTimeout(function () {
          $scope.setupWebSockets("init", null);
        }, 5000);
      });
    };
    $scope.ShowMessage = function () {
      var data = $scope.events[0];
      var message =
        "A new event of your interest has just been created!! City - " +
        data.eventDetails.city +
        ", Event type - " +
        data.eventDetails.event_name +
        " , Event Posted By - " +
        data.eventDetails.postedby +
        ", Email - " +
        data.eventDetails.email +
        ", Phone - " +
        data.eventDetails.phone_number +
        ", Address - " +
        data.eventDetails.address +
        ", Item Type - " +
        data.eventDetails.itemtype +
        ", Item - " +
        data.eventDetails.items;
      Notification.info({
        message: message,
        title: "New Event",
        positionY: "top",
        positionX: "center",
        delay: 12000,
      });
      $scope.events = [];
    };
    function createRoom(email) {
      if (socket) {
        socket.emit("create-room", {
          channel: email,
        });
      } else {
        console.log(
          "createRooms function saw null socket...calling setupWebsockets"
        );
        $scope.setupWebSockets("init", null);
      }
    }

    $scope.CreateEvent = function (event, group_uuid, group_name) {
      $scope.loginResult = "";
      var now = new Date();
      var postURL = BASEURL + "/createevent";
      var reqObj = {
        email: $scope.login_email,
        postedby: $scope.login_fullname,
        time: now,
        phone_number: event.phone,
        address: event.address,
        city: event.city,
        items: event.items,
        itemtype: event.itemtype,
        latitude: $scope.lat,
        longitude: $scope.lng,
        fa_icon: $scope.GetFontAwesomeIconsForCategory(event.itemtype),
        group_uuid: group_uuid,
        group_name: group_name,
      };
      postURL = encodeURI(postURL);
      console.log("#######CreateEvent URL=" + postURL);
      $http.post(postURL, JSON.stringify(reqObj)).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.loginResult = "Success";
          $scope.spinner = false;
          $scope.status = response.statusText;
          // Connect event uuid with group name
          //$scope.ConnectEntities(group, response.data._data.uuid);
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.loginResult =
            "Error Received from Server.." + error.toString();
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
          $scope.spinner = false;
          $scope.status = error.statusText;
        }
      );
    };

    $scope.FetchEvents = function () {
      $scope.spinner = true;
      var getURL = BASEURL + "/fetchevents";

      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          $scope.spinner = false;
          console.log(
            "received response for scan: " + JSON.stringify(response)
          );
          $rootScope.scanData = response.data;
        },
        function errorCallback(error) {
          console.log("Error doing top level scan - " + error);
          $scope.spinner = false;
        }
      );
    };
    $scope.getIconForFileType = function (type) {
      if (!type || type.length < 2) return;
      type = type.toLowerCase();
      console.log("Fetching ICON for file type" + type);
      if (type === "javascript" || type === "yml")
        return "https://img.icons8.com/color/48/null/javascript--v1.png";
      if (type === "java")
        return "https://img.icons8.com/nolan/64/java-coffee-cup-logo.png";
      if (type === "python")
        return "https://img.icons8.com/fluency/48/null/python.png";
      if (type === "ruby")
        return "https://img.icons8.com/fluency/48/null/ruby-programming-language.png";
      if (type === "pom.xml")
        return "https://img.icons8.com/nolan/64/java-coffee-cup-logo.png";
      if (type === "package.json")
        return "https://img.icons8.com/color/48/null/javascript--v1.png";
      if (type === "php")
        return "https://img.icons8.com/arcade/64/null/php.png";
      if (type === "go")
        return "https://img.icons8.com/ios-filled/50/null/go.png";
      return "https://img.icons8.com/nolan/64/java-coffee-cup-logo.png";
    };
    $scope.Login2 = function (login) {
      $scope.spinner = true;
      var getURL =
        BASEURL +
        "/login?email=" +
        login.email.trim() +
        "&password=" +
        login.password.trim();

      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //      $scope.loginResult = response.data;
          $scope.spinner = false;
          if (
            angular.isObject(response) &&
            response.data.toString() === "Authentication Error"
          ) {
            Notification.error({
              message: "Invalid Password!",
              title: "Error",
              positionY: "bottom",
              positionX: "center",
              delay: 4000,
            });
            return;
          } else {
            console.log("Login Success!");
            var obj = response.data;
            UserService.setLoggedIn(obj);
            UserService.setLoggedInStatus(true);
            $scope.loginResult = obj.name;
            $scope.name = obj.name;
            $scope.login_email = obj.email;
            $scope.login_fullname = obj.name;
            $scope.login_phone = obj.phone;
            $rootScope.username = obj.name;
            $rootScope.subscribed_events = obj.subscribed_events;
            $rootScope.event_receive_location = obj.event_receive_location;
            $rootScope.event_receive_max_distance =
              obj.event_receive_max_distance;
            $rootScope.loggedIn = true;
            $location.path("/home");
            //$rootScope.$emit("CallSetupWebSocketsMethod", {});
            //$rootScope.$emit("CallCreateRoomsMethod", {});
            //$location.path($rootScope.savedLocation);
            $scope.setupWebSockets("init", null);
            //$rootScope.$emit("CallGetEventsMethod", {});
            return;
          }
        },
        function errorCallback(error) {
          console.log("Login Failed: " + JSON.stringify(error));
          if (angular.isObject(error) && error.status === 400) {
            $scope.loginResult = "Id Not Found";

            if (
              confirm(
                "Email ID not found in App database. Would you like to create an account with this id?"
              ) == true
            ) {
              $location.path("/signup");
              return;
            }
          }
          $scope.spinner = false;
          $scope.loginResult = "Login Failed";
        }
      );
    };

    function adjustsettings(settingsObject) {
      if (!settingsObject) return true;

      var start = new Date(settingsObject.pushstarttime);
      var stop = new Date(settingsObject.pushstoptime);
      var timenow = new Date();
      start.setFullYear(
        timenow.getFullYear(),
        timenow.getMonth(),
        timenow.getDate()
      );
      stop.setFullYear(
        timenow.getFullYear(),
        timenow.getMonth(),
        timenow.getDate()
      );
      if (stop < start) stop.setDate(timenow.getDate() + 1);
      settingsObject.pushstarttime = start;
      settingsObject.pushstoptime = stop;
      return settingsObject;
    }
    $scope.HaveIAcceptedThisdonation = function (row) {
      if (!row.receiver || receiver.length < 1) return false;
      if (row.receiver.receiver_email == UserService.getLoggedIn().email)
        return true;
      else return false;
    };

    $scope.Subscribe = function () {
      $scope.spinner = true;

      //var selectedTypes = $rootScope.subscribed_events;
      selectedTypes = [];
      if ($scope.data) {
        if (!$scope.city) {
          Notification.error({
            message: "Please enter City and Item name for alerts",
            title: "Error",
            positionY: "bottom",
            positionX: "center",
            delay: 4000,
          });
          return;
        }
        for (var key in $scope.data) {
          if ($scope.data[key])
            selectedTypes.push(
              key.toString().toUpperCase().replace("_", "-") +
                "-" +
                $scope.city.toString().trim().toUpperCase()
            );
        }
        console.log("Selected Types: " + JSON.stringify(selectedTypes));
      }
      var postURL = BASEURL + "/subscribe_events";
      var reqObj = {
        events: selectedTypes,
        event_receive_location: $scope.event_receive,
        email: UserService.getLoggedIn().email,
        user_id: UserService.getLoggedIn()._id,
      };
      console.log("Sending Event payload: " + JSON.stringify(reqObj));
      postURL = encodeURI(postURL);
      $http.put(postURL, JSON.stringify(reqObj)).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          var u = $scope.login_email;
          //addUserToGroup(group, u);
          //$scope.found  = "Active donation offers for " + param_name;
          Notification.success({
            message: "Subscription added successfully.",
            positionY: "bottom",
            positionX: "center",
          });
          console.log(
            "Subscribe Events Response from API: " + JSON.stringify(response)
          );
          console.log(
            "Sending to websocket server to create new subscriptions..."
          );
          $rootScope.subscribed_events = selectedTypes;
          $rootScope.event_receive_max_distance =
            $scope.event_receive.max_distance;
          $rootScope.event_receive_location = {
            type: "Point",
            coordinates: [$scope.event_receive.lng, $scope.event_receive.lat],
          };

          socket.emit("create-room", {
            //channels: $rootScope.subscribed_events,
            channels: "newscan",
          });
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.found =
            "Could not process this request. Please try again later!";
          console.log("#####Subscribe error: " + JSON.stringify(error));
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
          $scope.alldonations = false;
        }
      );
    };
    $scope.GetEventsForUser = function (executeInBg) {
      if (!executeInBg) {
        $scope.spinner = true;
        $scope.list_events = false;
      } else {
        $scope.spinner = false;
      }
      $scope.found = "";
      var fetchURL = BASEURL + "/fetchevents?";
      fetchURL = encodeURI(fetchURL);
      var reqObj = {
        subscribed_events: $rootScope.subscribed_events,
      };
      console.log("Calling fetchevents API..");
      $http.post(fetchURL, JSON.stringify(reqObj)).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          if (!executeInBg) {
            $scope.spinner = false;
            $scope.list_events = true;
          }
          if (response) {
            $scope.events = response.data;
            $rootScope.eventsCount = response.data.length;
          }
          /*
          //Show only newer events
          var ONE_DAY = 24 * 60 * 60 * 1000; //ms
          var filteredEvents = [];
          if ($scope.events && $scope.events.length > 0) {
            for (var i = 0; i < $scope.events.length; i++) {
              var d = new Date();
              var o = new Date($scope.events[i].time_created);
              if (d - o > 4 * ONE_DAY)
                //events for only last 4 days
                continue;
              else if (
                $scope.events[i].email === UserService.getLoggedIn().email
              )
                //self posted event
                continue;
              else filteredEvents.push($scope.events[i]);
            }
            //console.log("Filtered " + ($scope.events.length - filteredEvents.length) + " old records");
            $scope.events = filteredEvents;
            $scope.resultEvents =
              "Found " +
              $scope.events.length +
              " events matching your criteria.";
          } else {
            $scope.found = "No Notifications Found";
            $scope.showevents = false;
          }
          $rootScope.eventsCount = $scope.events.length;
        */
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(JSON.stringify(error));
          $scope.spinner = false;
          $scope.groupusers = "ERROR GETTING GROUP USERS ";
          $scope.showevents = false;
          if (error.status == 404) {
            $scope.found = "No records matching your subscriptions found.";
            $rootScope.eventsCount = 0;
          } else $scope.found = "Could not fetch events. " + error.data;
        }
      );
    };

    function SendPushToUserByEmail(email, text) {
      $scope.spinner = true;
      var getURL = BASEURL + "/getuser?email=" + email.trim();
      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          $scope.spinner = false;
          if (
            angular.isObject(response) &&
            response.data.toString() === "User Not Found"
          ) {
            $scope.found = "Id Not Found";
          } else {
            var obj = response.data[0];
            if (!checkIfPushAllowedNow(obj.settings)) {
              console.log(
                "SendPushToUser: Prevented push as filtered by settings opitions. " +
                  ":" +
                  JSON.stringify(response.data.settings)
              );
              return;
            } else {
              console.log(
                "SendPushToUser: Sending Push as filtered by settings opitions. " +
                  ":" +
                  JSON.stringify(response.data.settings)
              );
              SendPushToUser(obj.uuid, text);
            }

            return;
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          //      $scope.loginResult = "Could not submit login request.." + error;
          $scope.spinner = false;
          //      $scope.login_email = '';
        }
      );
    }
    $scope.NotifyDonor = function (email, text) {
      if (!email) {
        Notification.error({
          message: "Email Not Found!",
          positionY: "bottom",
          positionX: "center",
        });
        $scope.found = "ERROR - Email NOT FOUND";
        return;
      }
      $scope.spinner = true;
      //first create group with id=<city>-<place>
      var getURL = BASEURL + "/getuser?email=" + email.trim();
      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          var passengers = [];
          passengers = response.data;
          for (var i = 0; i < passengers.length; i++) {
            var auuid = "";
            auuid = passengers[i].uuid;
            SendPushToUser(auuid, text);
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.passengers = "ERROR GETTING PASSENGERS ";
        }
      );
    };

    function SendPushToUser(uuid, text) {
      //       alert("Sending Push TO User With UUID=" + uuid);
      //        return;
      $scope.spinner = true;
      if (!uuid) {
        $scope.found = "ERROR";
        console.log("SendPushToUser(uuid, text): No UUID received");
        return;
      }
      console.log(
        "Attempting to send push to uuid: " + uuid + " with text: " + text
      );
      //first create group with id=<city>-<place>
      var getURL = BASEURL + "/getuserbyuuid?uuid=" + uuid.trim();
      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;

          if (!checkIfPushAllowedNow(response.data.settings)) {
            console.log(
              "SendPushToUser: Prevented push as filtered by settings opitions. " +
                uuid +
                ":" +
                JSON.stringify(response.data.settings)
            );
            return;
          } else {
            console.log(
              "SendPushToUser: Sending Push as filtered by settings opitions. " +
                uuid +
                ":" +
                JSON.stringify(response.data.settings)
            );
          }

          var gcmidarray = [];
          gcmidarray = response.data.gcm_ids;
          console.log("SendPush GCMIDs=" + JSON.stringify(gcmidarray));
          var gcmids = "";
          if (gcmidarray && gcmidarray.length > 0) {
            for (var i = 0; i < gcmidarray.length; i++) {
              gcmids += gcmidarray[i] + "^";
            }
            $scope.SendPush(gcmids, text);
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
        }
      );
    }
    $scope.SendSettings = function (settings) {
      $scope.result = "";
      $scope.spinner = true;
      var starttimehrs = new Date(settings.fromtime).getHours();
      var starttimemin = new Date(settings.fromtime).getMinutes();
      var stoptimehrs = new Date(settings.totime).getHours();
      var stoptimemin = new Date(settings.totime).getMinutes();

      $scope.spinner = true;
      var getURL =
        BASEURL +
        "/updateusersettings?uuid=" +
        $scope.uuid +
        "&starttimehrs=" +
        starttimehrs +
        "&starttimemin=" +
        starttimemin +
        "&stoptimehrs=" +
        stoptimehrs +
        "&stoptimemin=" +
        stoptimemin +
        "&pushon=" +
        settings.pushon;
      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          $scope.result = "SUCCESS SAVING YOUR SETTINGS ";
          // $scope.found  = "Active donation offers for " + param_name;
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.result = "ERROR ADDING SUBSCRIPTION TO PUSH MESSAGES ";
          $scope.alldonations = false;
        }
      );
    };

    $scope.AcceptDonation = function (row, status) {
      $scope.uuid = "";
      $scope.result = "";
      $scope.spinner = true;
      var loggedinUser = UserService.getLoggedIn();
      var receiveTime = new Date();
      var filteredtime = $filter("date")(receiveTime, "medium");
      var updateURL =
        BASEURL +
        "/acceptdonation?uuid=" +
        row.uuid +
        "&receiver_name=" +
        loggedinUser.fullname +
        "&receiver_phone=" +
        loggedinUser.phone +
        "&receiver_email=" +
        loggedinUser.email +
        "&receiver_uuid=" +
        loggedinUser.uuid +
        "&received_time=" +
        filteredtime +
        "&status=" +
        status;
      console.log("Accept donation URL is: " + updateURL);
      $http({
        method: "GET",
        url: encodeURI(updateURL),
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //alert(response)
          //   $scope.found  = "Accepted donation Successfully going from " + row.from + " to " + row.to + " at " + row.time;
          $scope.spinner = false;
          if (response.data === "Already Accepted") {
            $scope.result = response.data;
            $scope.uuid = row.uuid;
            $scope.alldonations = true;
            $scope.cancel = true;
            return;
          } else {
            $scope.result = ("successfully " + status).toUpperCase();
            $scope.GetDonations("city", row.city, false);
            $scope.uuid = row.uuid;
            $scope.alldonations = true;
            $scope.cancel = true;
            SendPushToUserByEmail(
              row.email,
              "donation accepted by " + loggedinUser.fullname
            );
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.accepteddonation = "Could not submit acceptance. " + error;
          $scope.cancel = false;
        }
      );
    };
    var accepts = [];

    $scope.GetdonationAcceptances = function (row, cancel) {
      $scope.spinner = true;
      var acceptsURL = BASEURL + "/getdonationacceptances?uuid=" + row.uuid;
      $http({
        method: "GET",
        url: acceptsURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          accepts = response.data.entities;
          if (cancel) $scope.Canceldonation(row, false);
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          alert("Could not submit acceptance. " + error);
          $scope.accepted = false;
        }
      );
    };

    $scope.GetAcceptedDonations = function (email) {
      $scope.spinner = true;
      var getURL = BASEURL + "/accepteddonations?email=" + email.trim();
      getURL = encodeURI(getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          if (angular.isArray(response.data)) {
            $scope.citydonations = response.data;
            // $scope.found  = "Active donation offers for " + param_name;
            $scope.alldonations = true;
            $scope.cancel = true;
          } else {
            $scope.result = response.data;
            // $scope.found  = "Active donation offers for " + param_name;
            $scope.alldonations = false;
            $scope.cancel = false;
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.found = "Oops! There was a problem. " + error;
          $scope.alldonations = false;
        }
      );
    };
    $scope.CancelOffer = function (row) {
      if (confirm("Are you sure you want to cancel this offer?") == false) {
        console.log("####User cancelled Offer Deletion");
        return;
      }
      $scope.spinner = true;
      var cancelURL = BASEURL + "/canceloffer?uuid=" + row.uuid;
      Notification.info({
        message: "Obliterating offer..please wait!",
        positionY: "bottom",
        positionX: "center",
      });
      $http({
        method: "GET",
        url: encodeURI(cancelURL),
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          //alert("Successfully Cancelled.");
          Notification.success({
            message: "All done! Sucessfully removed offer.",
            positionY: "bottom",
            positionX: "center",
          });
          $scope.cancel = true;
          $scope.GetDonations("email", $scope.login_email, true);
          $scope.result = "Successfully Cancelled This Offer";
          /*SendPushToUser(
                    row.receiver.receiver_uuid,
                    "A donation offered by " + $scope.fullname + " has been cancelled"
                );*/
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.result = "Could not cancel. " + cancelURL;
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
          $scope.accepted = false;
          $scope.uuid = row.uuid;
          $scope.cancel = false;
          return;
        }
      );
    };

    $scope.Canceldonation = function (row, responseAsMessage) {
      //   $scope.uuid = '';
      //    $scope.GetdonationAcceptances(row);
      $scope.spinner = true;
      var cancelURL =
        BASEURL +
        "/cancelaccepteddonation?uuid=" +
        row.uuid +
        "&receiver_email=" +
        UserService.getLoggedIn().email;
      $http({
        method: "GET",
        url: cancelURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          Notification.info({
            message: "Successfully Cancelled This Offer!",
            positionY: "bottom",
            positionX: "center",
          });
          if (responseAsMessage) {
            $scope.GetMyAccepteddonations(login_email);
            return;
          }
          $scope.uuid = row.uuid;
          $scope.cancel = true;
          $scope.Getdonations("city", row.city, false);
          $scope.result = "Cancelled donation";
          //    SendPushToUserByEmail(row.email, "donation cancelled by a passenger");
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.result = "Could not cancel. ";
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
          $scope.accepted = false;
          $scope.uuid = row.uuid;
          $scope.cancel = false;
        }
      );
    };
    $scope.ContactUs = function (query) {
      $scope.spinner = true;
      var getURL =
        /*BASEURL + "/contactus?email=" +
            query.email.trim() +
            "&fullname=" +
            query.name.trim() +
            "&phone=" +
            query.phone.trim() + "&city=" +
            query.city.trim() + "&subject=" +
            query.subject.trim() + "&text=" +
            query.text.trim();*/
        BASEURL + "/contactus";
      getURL = encodeURI(getURL);
      var reqObj = {
        email: query.email.trim(),
        fullname: query.name.trim(),
        phone: query.phone.trim(),
        city: query.city.trim(),
        subject: query.subject.trim(),
        text: query.text.trim(),
      };
      console.log("ContactUs URL=" + getURL);
      $http.post(getURL, JSON.stringify(reqObj)).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          if (
            angular.isObject(response) &&
            response.data.toString() === "QUERY CREATED"
          ) {
            Notification.success({
              message:
                "Thank You! Your query has been sent. We will get back to you as soon as possible.",
              positionY: "bottom",
              positionX: "center",
            });
            $scope.result =
              "Thank You! Your query has been sent. We will get back to you as soon as possible.";
            return;
          } else {
            $scope.result = "Error sending mail. Please try again later.";
            Notification.error({
              message: "Could not create user id, might be existing!",
              positionY: "bottom",
              positionX: "center",
            });
            return;
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.result = "Error submitting  request. Please try again later.";
          Notification.error({
            message: "Could not create user id, might be existing!",
            positionY: "bottom",
            positionX: "center",
          });
        }
      );
    };
    $scope.Logout = function () {
      $scope.login_email = "";
      UserService.setLoggedIn({});
      UserService.setLoggedInStatus(false);
      $rootScope.loggedIn = false;
      $rootScope.eventsCount = 0;
      $location.path("/home");
      console.log(
        "Logout: Set logged in status = " + UserService.getLoggedInStatus()
      );
      return;
    };
    $scope.spinner = false;
    //$scope.login_fullname = UserService.getLoggedIn().fullname;
    //$scope.login_email = UserService.getLoggedIn().email;
    //    $scope.login_phone = UserService.getLoggedIn().phone;
    //    $scope.login_address = UserService.getLoggedIn().address;
    $scope.CreateUser = function (user) {
      $scope.spinner = true;
      var getURL = BASEURL + "/users/insert";
      var reqObj = {
        email: user.email.trim(),
        name: user.name.trim(),
        password: user.password.trim(),
        phone: user.phone,
        organisation: user.org,
        ngo: user.ngo,
      };
      getURL = encodeURI(getURL);
      console.log("ContactUs URL=" + getURL);
      $http.post(getURL, JSON.stringify(reqObj)).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          console.log("CreateUser Success: " + JSON.stringify(response));
          if (
            angular.isObject(response) &&
            response.status.toString() === "201"
          ) {
            Notification.success({
              message: "Account Created with id " + user.email,
              positionY: "bottom",
              positionX: "center",
            });
            $location.path("/login");
            return;
          } else {
            $scope.result = "Error creating id. Email already in use.";
            Notification.error({
              message: "Could not create user id, might be existing!",
              positionY: "bottom",
              positionX: "center",
            });
            //        $location.path("/login");
            return;
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.loginResult = "Could not submit request.." + error;
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
        }
      );
    };
    $scope.UpdateUser = function (user) {
      if ($scope.login_email && (!user || (!user.phone && !user.address))) {
        Notification.error({
          message: "Please enter values to update",
          positionY: "bottom",
          positionX: "center",
        });
        $scope.spinner = false;
        return;
      } else if (
        !$scope.login_email &&
        (!user || !user.email || !user.password)
      ) {
        Notification.error({
          message: "Please Enter Email and Password",
          positionY: "bottom",
          positionX: "center",
        });
        return;
      }
      $scope.spinner = true;
      var email = "";
      if ($scope.login_email) email = $scope.login_email;
      else email = user.email;
      var getURL = BASEURL + "/updateuser?name=" + email;
      /*if (user && user.phone)
            getURL += "&phone=" + user.phone.trim();
        else
            getURL += "&phone=" + UserService.getLoggedIn().phone;
        if (user && user.address)
            getURL += "&address=" + user.address.trim();
        else
            getURL += "&address=" + UserService.getLoggedIn().address;*/
      if (user && user.password) getURL += "&password=" + user.password.trim();
      getURL = encodeURI(getURL);
      console.log("Update URL=" + getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          if (angular.isObject(response)) {
            console.log("UpdateUSer response: " + JSON.stringify(response));

            if (!$scope.login_email) {
              Notification.success({
                message: "Password Update Successful!",
                positionY: "top",
                positionX: "center",
                delay: 4000,
              });
              $scope.result = "Password Update Sucessful.";
              $location.path("/login");
              return;
            } else {
              Notification.success({
                message: "Successfully updated your info!",
                positionY: "top",
                positionX: "center",
                delay: 4000,
              });
              $scope.result = "Account Update Sucessful.";
              if (
                DataService.isValidObject(response) &&
                DataService.isValidObject(response.data) &&
                DataService.isValidObject(response.data._data)
              ) {
                UserService.setLoggedIn(response.data._data);
              }
              return;
            }
          } else {
            $scope.result = "Could not update profile";
            Notification.error({
              message: "Could not update profile!",
              positionY: "top",
              positionX: "center",
              delay: 4000,
            });
            //        $location.path("/login");
            return;
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.loginResult = "Could not submit request.." + error;
        }
      );
    };
    $scope.SendResetPasswordRequest = function (email) {
      if (!email || email.length < 4) {
        Notification.info({
          message: "Please enter valid email!",
          positionY: "top",
          positionX: "center",
          delay: 4000,
        });
        return;
      }
      var getURL = BASEURL + "/sendresetpwmail?email=" + email.trim();
      getURL = encodeURI(getURL);
      console.log("Create URL=" + getURL);
      $http({
        method: "GET",
        url: getURL,
      }).then(
        function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.spinner = false;
          console.log(
            "SendResetPasswordRequest response: " + JSON.stringify(response)
          );
          if (
            DataService.isValidObject(response) &&
            response.data &&
            response.data == "Email Not Found"
          ) {
            Notification.error({
              message:
                "Error processing this request. Please check the email address!",
              positionY: "bottom",
              positionX: "center",
            });
          } else {
            Notification.success({
              message: "An email has been sent with the password reset link.",
              positionY: "bottom",
              positionX: "center",
            });
          }
        },
        function errorCallback(error) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.spinner = false;
          $scope.loginResult = "Could not submit request.." + error;
          Notification.error({
            message: "Error processing this request. Please try again later!",
            positionY: "bottom",
            positionX: "center",
          });
        }
      );
    };
    $scope.Back = function () {
      $window.history.back();
    };
  }
);
