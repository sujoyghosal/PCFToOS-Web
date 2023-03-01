var app = angular.module("myApp", [
  "ngRoute",
  "ui.bootstrap",
  "ui.directives",
  "ui.filters",
  "ui-notification"
]);
app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "home.html",
        //templateUrl: "Login.html",
        controller: "DashboardCtrl",
        isLogin: true,
      })
      .when("/home", {
        templateUrl: "home.html",
        controller: "DashboardCtrl",
      })
      .when("/register", {
        templateUrl: "Register.html",
        controller: "DashboardCtrl",
      })
      .when("/updateuser", {
        templateUrl: "UpdateProfile.html",
        controller: "DashboardCtrl",
      })
      .when("/updatepassword", {
        templateUrl: "UpdateProfile.html",
        controller: "DashboardCtrl",
      })
      .when("/signup", {
        templateUrl: "Register.html",
        controller: "DashboardCtrl",
      })
      .when("/getdonation", {
        //templateUrl: "ListDonations.html",
        templateUrl: "ViewOffers.html",
        controller: "DashboardCtrl",
      })
      .when("/donationsaccepted", {
        templateUrl: "MyPickupList.html",
        controller: "DashboardCtrl",
      })
      .when("/offerdonation", {
        templateUrl: "OfferDonation.html",
        controller: "DashboardCtrl",
      })
      .when("/offershistory", {
        templateUrl: "MyOffers.html",
        controller: "DashboardCtrl",
      })
      .when("/createneed", {
        templateUrl: "CreateNeed.html",
        controller: "DashboardCtrl",
      })
      .when("/myneeds", {
        templateUrl: "MyNeeds.html",
        controller: "DashboardCtrl",
      })
      .when("/createemergency", {
        templateUrl: "CreateEmergency.html",
        controller: "DashboardCtrl",
      })
      .when("/viewneeds", {
        templateUrl: "NeedsNearby.html",
        controller: "DashboardCtrl",
      })
      .when("/viewemergencies", {
        templateUrl: "ViewEmergencies.html",
        controller: "DashboardCtrl",
      })
      .when("/settings", {
        templateUrl: "settings.html",
        controller: "DashboardCtrl",
      })
      .when("/subscribe", {
        templateUrl: "Subscribe2.html",
        controller: "DashboardCtrl",
      })
      .when("/sendnotification", {
        templateUrl: "SendPush.html",
        controller: "DashboardCtrl",
      })
      .when("/notifications", {
        templateUrl: "Notifications.html",
        controller: "DashboardCtrl",
      })
      .when("/eventsnearby", {
        templateUrl: "MyNearbyEvents.html",
        controller: "DashboardCtrl",
      })
      .when("/resetpw", {
        templateUrl: "ResetPassword.html",
        controller: "DashboardCtrl",
      })
      .when("/index", {
        templateUrl: "index.html",
        controller: "DashboardCtrl",
      })
      .when("/contactus", {
        templateUrl: "ContactUs.html",
        controller: "DashboardCtrl",
      })
      .otherwise({
        redirectTo: "/login",
      });
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

var BASEURL_LOCAL = "http://localhost:8080";
var BASEURL_DOCKER = "http://localhost:49155";
var BASEURL_GCP = "http://34.131.27.98:5555";
var BASEURL_OS = "https://pcf-to-os-api-concession-kiosk.pcf-to-ocp-migration-c6c44da74def18a795b07cc32856e138-0000.us-south.containers.appdomain.cloud";

var BASEURL = BASEURL_LOCAL;
var socket = null;
var GEOCODEURL =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwQOPx91fjj06kDNq7hjkT-ZSxkQFtJPA";
//"http://api.positionstack.com/v1/forward?access_key=cff8960a5b6a7fde5eac5d20b3d16295";

app.controller(
  "DashboardCtrl",
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
    $rootScope.context_envvars_count = 0;
    $rootScope.context_vcap_envvars_count = 0;
    $rootScope.context_deps_count = 0;
    $rootScope.context_instances_normal = 0;
    $rootScope.context_instances_mh = 0;
    $rootScope.context_instances_h = 0;
    $rootScope.context_instances_vh = 0;
    $rootScope.context_memory_normal = 0;
    $rootScope.context_memory_mh = 0;
    $rootScope.context_memory_h = 0;
    $rootScope.context_memory_vh = 0;
    $rootScope.context_dq_normal = 0;
    $rootScope.context_dq_mh = 0;
    $rootScope.context_dq_h = 0;
    $rootScope.context_dq_vh = 0;
    $rootScope.context_lrl_normal = 0;
    $rootScope.context_lrl_mh = 0;
    $rootScope.context_lrl_h = 0;
    $rootScope.context_lrl_vh = 0;
    $rootScope.context_memory = 0;
    $rootScope.context_disk_quota = 0;
    $rootScope.context_log_rate_limit = 0;
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
    $scope.isMobileDevice = function () { };
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
        $rootScope.scanData = "";
        $rootScope.myText = data.eventDetails.results;
        $rootScope.context_email = data.eventDetails.email;
        $rootScope.context_time = data.eventDetails.time_created;
        $rootScope.context_type = data.eventDetails.event_type;
        $rootScope.context_source_type = data.eventDetails.file_type;
        $rootScope.context_file_number = data.eventDetails.file_number;
        $rootScope.context_deps_count +=
          Number.parseInt(data.eventDetails.results.count_of_dependencies);
        $rootScope.context_envvars_count +=
          Number.parseInt(data.eventDetails.results.env_vars_count);
        $rootScope.context_vcap_envvars_count +=
          Number.parseInt(data.eventDetails.results.vcap_env_vars_count);


        var ci = Number.parseInt(data.eventDetails.manifest.applications[0].instances);
        if (ci > 0 && ci <= 2)
          $rootScope.context_instances_normal++;
        if (ci > 2 && ci <= 4)
          $rootScope.context_instances_mh++;
        if (ci > 4 && ci <= 5)
          $rootScope.context_instances_h++;
        if (ci > 5)
          $rootScope.context_instances_vh++;

        var m = Number.parseInt(data.eventDetails.manifest.applications[0].memory.replace('M', ''));
        if (m > 0 && m <= 128)
          $rootScope.context_memory_normal++;
        if (m > 128 && m <= 256)
          $rootScope.context_memory_mh++;
        if (m > 256 && m <= 512)
          $rootScope.context_memory_h++;
        if (m > 512)
          $rootScope.context_memory_vh++;

        var dq = Number.parseInt(data.eventDetails.manifest.applications[0].disk_quota.replace('M', ''));
        if (dq > 0 && dq <= 1024)
          $rootScope.context_dq_normal++;
        if (dq > 1024 && dq <= 2048)
          $rootScope.context_dq_mh++;
        if (dq > 2048 && dq <= 3072)
          $rootScope.context_dq_h++;
        if (dq > 3072)
          $rootScope.context_dq_vh++;

        var lrl = Number.parseInt(JSON.stringify(data.eventDetails.manifest.applications[0]["log-rate-limit"]).replace('Kb', '').replace('"', ''));
        console.log("####LRL=" + lrl)
        if (lrl > 0 && lrl <= 20)
          $rootScope.context_lrl_normal++;
        if (lrl > 20 && lrl <= 40)
          $rootScope.context_lrl_mh++;
        if (lrl > 40 && lrl <= 60)
          $rootScope.context_lrl_h++;
        if (lrl > 60)
          $rootScope.context_lrl_vh++;

        $rootScope.context_memory +=
          Number.parseInt(data.eventDetails.manifest.applications[0].memory.replace('M', ''));
        $rootScope.context_disk_quota +=
          Number.parseInt(JSON.stringify(data.eventDetails.manifest.applications[0].disk_quota).replace('M', ''));
        $rootScope.context_log_rate_limit +=
          Number.parseInt(JSON.stringify(data.eventDetails.manifest.applications[0]["log-rate-limit"]).replace('Kb', ''));

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
