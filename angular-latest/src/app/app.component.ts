import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public title = 'Line Chart';

  public BASEURL = 'http://localhost:8080'
  setupWebSockets = function (purpose, arg) {
    socket = io(this.BASEURL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    this.socket.on("connect", () => {
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
      $rootScope.context_deps_count =
        Number.parseInt(data.eventDetails.results.count_of_dependencies);
      $rootScope.context_envvars_count =
        Number.parseInt(data.eventDetails.results.env_vars_count);
      $rootScope.context_vcap_envvars_count =
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
      $rootScope.pieChartData = [{
        id: 0,
        label: 'slice 1',
        value: 50,
        color: 'blue',
      }, {
        id: 1,
        label: 'slice 2',
        value: 20,
        color: 'black',
      }, {
        id: 2,
        label: 'slice 3',
        value: 30,
        color: 'red',
      }]

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
}
