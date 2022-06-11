const LOGGER_ROUTE_KEYS = {
  SERVER_CORE: "Server-Core",
  SERVER_ENVIRONMENT: "Server-Env",
  SERVER_FALLBACK: "Server-Fallback",
  SERVER_APP: "Server-App",
  SERVER_TASKS: "Server-Tasks",
  SERVER_CLIENT: "Server-Client",
  MIDDLEWARE_MORGAN: "Middleware-Morgan",
  MIDDLEWARE_PASSPORT: "Middleware-Passport",
  MIDDLEWARE_VALIDATION: "Middleware-Validation",
  ROUTE_DATABASE_ISSUE: "Route-Database-Issue",
  ROUTE_FILAMENT_MANAGER: "Route-Filament-Manager",
  ROUTE_LOCAL_SCRIPTS: "Route-Local-Scripts",
  ROUTE_NODEJS_ISSUE: "Route-NodeJS-Issue",
  ROUTE_PRINTER_MANAGER: "Route-Printer-Manager",
  ROUTE_SSE_OLD: "Route-SSE-Old",
  ROUTE_SYSTEM_SETTINGS: "Route-System",
  ROUTE_USERS: "Route-Users",
  SERVICE_CPU_PROFILE: "Service-CPU-Profiling",
  SERVICE_OP_ERROR_CAPTURE: "Service-OP-Error-Capture",
  SERVICE_EVENT_EMITER: "Service-Event-Emiter",
  SERVICE_FARM_INFORMATION: "Service-Farm-Information",
  SERVICE_FARM_PI: "Service-Farm-Pi",
  SERVICE_FILAMENT_CLEANER: "Service-Filament-Cleaner",
  SERVICE_FILE_CLEANER: "Service-File-Cleaner",
  SERVICE_GITHUB_CLIENT: "Service-Github-Client",
  SERVICE_HISTORY_CAPTURE: "Service-History-Capture",
  SERVICE_HISTORY_CLEANER: "Service-History-Cleaner",
  SERVICE_INFLUX_CLEANER: "Service-Influx-Cleaner",
  SERVICE_INFLUX_EXPORT: "Service-Influx-Export",
  SERVICE_JOB_CLEANER: "Service-Job-Cleaner",
  SERVICE_LOCAL_SCRIPT: "Service-Local-Script",
  SERVICE_SERVER_UPDATE: "Service-Server-Update",
  SERVICE_AUTO_DISCOVERY: "Service-Auto-Discovery",
  SERVICE_PATREON: "Service-Patreon",
  SERVICE_PRINTER_MANAGER: "Service-Printer-Manager",
  SERVICE_PRINTER_STATISTICS: "Service-Printer-Statistics",
  SERVICE_PRINTER: "Service-Printer",
  SERVICE_SERVER_SCRIPTS: "Service-Server-Scripts",
  SERVICE_SERVER_LOGS: "Service-Server-Logs",
  SERVICE_SSE: "Service-SSE",
  SERVICE_SYSTEM_INFORMATION: "Service-System-Information",
  SERVICE_SYSTEM_CONTROL: "Service-System-Control",
  SERVICE_TASK_MANAGER: "Service-Task-Manager",
  SERVICE_USER_ACTIONS: "Service-User-Actions",
  SERVICE_VERSION_PATCHES: "Service-Version-Patches",
  SERVICE_OCTOPRINT: "Service-OctoPrint",
  SERVICE_PRINTER_DATABASE: "Service-Printer-Database",
  STORE_HEALTH_CHECKS: "Store-Health-Checks",
  STORE_PRINTERS: "Store-Printers",
  OP_SERVICE_API: "OP-Service-API",
  OP_SERVICE_WEBSOCKET: "OP-Service-Websocket",
  OP_SERVICE_WEBSOCKET_MESSAGES: "OP-Service-Websocket-Messages",
  OP_STORE_PLUGIN_LIST: "OP-Store-Plugin-List",
  OP_UTIL_FILAMENT_MANAGER_PLUGIN: "OP-Util-Filament-Manager-Plugin",
  OP_UTIL_EVENTS: "OP-Util-Events",
  OP_UTIL_PLUGINS: "OP-Util-Plugins",
  OP_UTIL_WEBSOCKET_HELPER: "OP-Util-Websocket-Helper",
  UTILS_BENCHMARK: "Utils-Benchmark",
  UTILS_ENV_LOGGER: "Utils-Env",
  UTILS_ZIP: "Utils-Zip"
};

const LOGGER_FILES = {
  SYSTEM: "OctoFarm.System",
  API: "OctoFarm.Access",
  CLIENT: "OctoFarm.Client",
  PRINTER_OCTOPRINT: "OctoFarm.Printer.OctoPrint"
};

const logRouteToFileMap = {
  [LOGGER_ROUTE_KEYS.SERVER_CORE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVER_ENVIRONMENT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVER_FALLBACK]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVER_APP]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVER_TASKS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVER_CLIENT]: LOGGER_FILES.CLIENT,
  [LOGGER_ROUTE_KEYS.MIDDLEWARE_MORGAN]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.MIDDLEWARE_PASSPORT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.MIDDLEWARE_VALIDATION]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.ROUTE_DATABASE_ISSUE]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_FILAMENT_MANAGER]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_LOCAL_SCRIPTS]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_NODEJS_ISSUE]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_PRINTER_MANAGER]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_SSE_OLD]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_SYSTEM_SETTINGS]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.ROUTE_USERS]: LOGGER_FILES.API,
  [LOGGER_ROUTE_KEYS.SERVICE_CPU_PROFILE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_OP_ERROR_CAPTURE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_EVENT_EMITER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_FARM_INFORMATION]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_FARM_PI]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_FILAMENT_CLEANER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_FILE_CLEANER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_GITHUB_CLIENT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_HISTORY_CAPTURE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_HISTORY_CLEANER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_INFLUX_CLEANER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_INFLUX_EXPORT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_JOB_CLEANER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_LOCAL_SCRIPT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SERVER_UPDATE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_AUTO_DISCOVERY]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_PATREON]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_PRINTER_MANAGER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_PRINTER_STATISTICS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_PRINTER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SERVER_SCRIPTS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SERVER_LOGS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SSE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SYSTEM_INFORMATION]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_SYSTEM_CONTROL]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_TASK_MANAGER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_USER_ACTIONS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_VERSION_PATCHES]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_OCTOPRINT]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.SERVICE_PRINTER_DATABASE]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.STORE_HEALTH_CHECKS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.STORE_PRINTERS]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.OP_SERVICE_API]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_SERVICE_WEBSOCKET]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_SERVICE_WEBSOCKET_MESSAGES]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_STORE_PLUGIN_LIST]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_UTIL_FILAMENT_MANAGER_PLUGIN]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_UTIL_EVENTS]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_UTIL_PLUGINS]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.OP_UTIL_WEBSOCKET_HELPER]: LOGGER_FILES.PRINTER_OCTOPRINT,
  [LOGGER_ROUTE_KEYS.UTILS_BENCHMARK]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.UTILS_ENV_LOGGER]: LOGGER_FILES.SYSTEM,
  [LOGGER_ROUTE_KEYS.UTILS_ZIP]: LOGGER_FILES.SYSTEM
};

module.exports = {
  LOGGER_ROUTE_KEYS,
  LOGGER_FILES,
  logRouteToFileMap
};
