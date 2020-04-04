const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const yj = require("yieldable-json");
const ClientSettings = require("../models/ClientSettings.js");

//Global store of dashboard info... wonder if there's a cleaner way of doing all this?!
let dashboardInfo = null;

const farmStatistics = require("../runners/statisticsCollection.js");
const FarmStatistics = farmStatistics.StatisticsCollection;
const SystemInfo = require("../models/SystemInfo.js");
const runner = require("../runners/state.js");
const Runner = runner.Runner;
const Roll = require("../models/Filament.js");

var clientId = 0;
var clients = {}; // <- Keep a map of attached clients

//trying to find the circular reference
// This function is going to return an array of paths
// that point to the cycles in the object
const getCycles = object => {
  if (!object) {
    return;
  }

  // Save traversed references here
  const traversedProps = new Set();
  const cycles = [];

  // Recursive function to go over objects/arrays
  const traverse = function(currentObj, path) {
    // If we saw a node it's a cycle, no need to travers it's entries
    if (traversedProps.has(currentObj)) {
      cycles.push(path);
      return;
    }

    traversedProps.add(currentObj);

    // Traversing the entries
    for (let key in currentObj) {
      const value = currentObj[key];
      // We don't want to care about the falsy values
      // Only objects and arrays can produce the cycles and they are truthy
      if (currentObj.hasOwnProperty(key) && value) {
        if (value.constructor === Object) {
          // We'd like to save path as parent[0] in case when parent obj is an array
          // and parent.prop in case it's an object
          let parentIsArray = currentObj.constructor === Array;
          traverse(value, parentIsArray ? `${path}[${key}]` : `${path}.${key}`);
        } else if (value.constructor === Array) {
          for (let i = 0; i < value.length; i += 1) {
            traverse(value[i], `${path}.${key}[${i}]`);
          }
        }

        // We don't care of any other values except Arrays and objects.
      }
    }
  };

  traverse(object, "root");
  return cycles;
};

// Called once for each new client. Note, this response is left open!
router.get("/printerInfo/", ensureAuthenticated, function(req, res) {
  //req.socket.setTimeout(Number.MAX_VALUE);
  res.writeHead(200, {
    "Content-Type": "text/event-stream", // <- Important headers
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });
  res.write("\n");
  (function(clientId) {
    clients[clientId] = res; // <- Add this client to those we consider "attached"
    req.on("close", function() {
      delete clients[clientId];
    }); // <- Remove this client when he disconnects
  })(++clientId);
  //console.log("Client: " + Object.keys(clients));
});

setInterval(async function() {
  //Only needed for WebSocket Information
  let printers = await Runner.returnFarmPrinters();

  let statistics = await FarmStatistics.returnStats();
  let currentOperations = null;
  let currentOperationsCount = null;
  let farmInfo = null;
  let octofarmStatistics = null;
  let printStatistics = null;

  if (typeof statistics != "undefined") {
    currentOperations = statistics.currentOperations;
    currentOperationsCount = statistics.currentOperationsCount;
    farmInfo = statistics.farmInfo;
    octofarmStatistics = statistics.octofarmStatistics;
    printStatistics = statistics.printStatistics;
  } else {
    currentOperations = 0;
    currentOperationsCount = 0;
    farmInfo = 0;
    octofarmStatistics = 0;
    printStatistics = 0;
  }
  let printerInfo = [];
  let systemInformation = await SystemInfo.find({});
  let sysInfo = null;
  //There is a circular structure in here somewhere!?
  if (typeof systemInformation != undefined || systemInformation.length > 1) {
    sysInfo = {
      osInfo: systemInformation[0].osInfo,
      cpuInfo: systemInformation[0].cpuInfo,
      cpuLoad: systemInformation[0].cpuLoad,
      memoryInfo: systemInformation[0].memoryInfo,
      sysUptime: systemInformation[0].sysUptime,
      sysProcess: systemInformation[0].sysProcess
    };
  }

  let filly = await Roll.find({});
  let rolls = [];
  filly.forEach(r => {
    let filament = {
      id: r._id,
      name: r.roll.name,
      type: r.roll.type,
      colour: r.roll.colour,
      manufacturer: r.roll.manufacturer
    };
    rolls.push(filament);
  });
  let clientSettings = await ClientSettings.find({});
  let cSettings = {
    settings: clientSettings[0].settings,
    panelView: clientSettings[0].panelView,
    listView: clientSettings[0].listView,
    cameraView: clientSettings[0].cameraView
  };

  for (let i = 0; i < printers.length; i++) {
    let selectedFilament = null;
    if (typeof printers[i].selectedFilament != "undefined") {
      selectedFilament = printers[i].selectedFilament;
    }
    let printer = {
      state: printers[i].state,
      index: printers[i].index,
      ip: printers[i].ip,
      port: printers[i].port,
      camURL: printers[i].camURL,
      apikey: printers[i].apikey,
      currentZ: printers[i].currentZ,
      progress: printers[i].progress,
      job: printers[i].job,
      profile: printers[i].profiles,
      temps: printers[i].temps,
      flowRate: printers[i].flowRate,
      feedRate: printers[i].feedRate,
      stepRate: printers[i].stepRate,
      filesList: printers[i].fileList,
      logs: printers[i].logs,
      messages: printers[i].messages,
      plugins: printers[i].settingsPlugins,
      gcode: printers[i].settingsScripts,
      url: printers[i].ip + ":" + printers[i].port,
      settingsAppearance: printers[i].settingsApperance,
      stateColour: printers[i].stateColour,
      current: printers[i].current,
      options: printers[i].options,
      selectedFilament: selectedFilament,
      settingsWebcam: printers[i].settingsWebcam
    };
    printerInfo.push(printer);
  }
  dashboardInfo = {
    printerInfo: printerInfo,
    currentOperations: currentOperations,
    currentOperationsCount: currentOperationsCount,
    farmInfo: farmInfo,
    octofarmStatistics: octofarmStatistics,
    printStatistics: printStatistics,
    systemInfo: sysInfo,
    filament: rolls,
    clientSettings: cSettings
  };
  //Circular reference where areee youuu!?
  //console.log(getCycles(dashboardInfo));
  yj.stringifyAsync(dashboardInfo, (err, data) => {
    if (!err) {
      for (clientId in clients) {
        clients[clientId].write("data: " + data + "\n\n"); // <- Push a message to a single attached client
      }
    } else {
      console.log(err);
    }
  });
}, 500);

module.exports = router;
