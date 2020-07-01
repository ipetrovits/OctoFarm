// Calculation Functions
export default class Calculate {
  // Generate a random string
  static randomString() {
    const random = Math.random().toString(36).substr(2, 5);
    return random;
  }

  // Apply tofixed if not null
  static toFixed(amount, fractional) {
    if (typeof amount !== "undefined" && amount !== null) {
      return amount.toFixed(fractional);
    }
    return 0;
  }

  // Convert miliseconds to Days, Hours, Minutes
  static generateTime(seconds) {
    let string = "";
    if (seconds === undefined || isNaN(seconds) || seconds === null) {
      string = "No Time Estimate";
    } else {
      const years = Math.floor(seconds / (360 * 365));

      const days = Math.floor(seconds / (3600 * 24));

      seconds -= days * 3600 * 24;
      const hrs = Math.floor(seconds / 3600);

      seconds -= hrs * 3600;
      const mnts = Math.floor(seconds / 60);

      seconds -= mnts * 60;
      seconds = Math.floor(seconds);

      string = `${days} Days, ${hrs} Hrs, ${mnts} Mins, ${seconds} Seconds`;

      if (mnts == 0) {
        if (string.includes("0 Mins")) {
          string = string.replace(" 0 Mins,", "");
        }
      }
      if (hrs == 0) {
        if (string.includes("0 Hrs")) {
          string = string.replace(" 0 Hrs,", "");
        }
      }
      if (days == 0) {
        if (string.includes("0 Days")) {
          string = string.replace("0 Days,", "");
        }
      }
      if (mnts == 0 && hrs == 0 && days == 0 && seconds == 0) {
        string = string.replace("0 Seconds", "Done");
      }
    }

    return string;
  }

  // Check if values are between another value.
  static isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0;
  }

  static returnFilamentCost(filament, usageElement) {
    let grams = usageElement.replace("g", "");
    grams = parseFloat(grams);
    if (isNaN(grams)) {
      return `(No Length)`;
    }
    if (
      typeof filament === "undefined" ||
      filament === null ||
      filament == "None chosen..."
    ) {
      return `(No Spool)`;
    }
    const cost = (
      (filament.spools.price / filament.spools.weight) *
      grams
    ).toFixed(2);
    return cost;
  }

  static returnPrintCost(costSettings, time) {
    if (typeof costSettings === "undefined") {
      // Attempt to update cost settings in history...
      return "No cost settings to calculate from";
    }
    // calculating electricity cost
    const powerConsumption = parseFloat(costSettings.powerConsumption);
    const costOfElectricity = parseFloat(costSettings.electricityCosts);
    const costPerHour = powerConsumption * costOfElectricity;
    const estimatedPrintTime = time / 3600; // h
    const electricityCost = costPerHour * estimatedPrintTime;
    // calculating printer cost
    const purchasePrice = parseFloat(costSettings.purchasePrice);
    const lifespan = parseFloat(costSettings.estimateLifespan);
    const depreciationPerHour = lifespan > 0 ? purchasePrice / lifespan : 0;
    const maintenancePerHour = parseFloat(costSettings.maintenanceCosts);
    const printerCost =
      (depreciationPerHour + maintenancePerHour) * estimatedPrintTime;
    // assembling string
    const estimatedCost = electricityCost + printerCost;
    return estimatedCost.toFixed(2);
  }

  static bytes(a, b) {
    let string = "";
    if (a === undefined || isNaN(a) || a === null) {
      return (string = "No File Estimate");
    }
    if (a == 0) return "0 Bytes";
    const c = 1024;
    const d = b || 2;
    const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const f = Math.floor(Math.log(a) / Math.log(c));
    return `${parseFloat((a / Math.pow(c, f)).toFixed(d))} ${e[f]}`;
  }
}
