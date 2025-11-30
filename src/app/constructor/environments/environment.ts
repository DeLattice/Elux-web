export const environment = {
// @ts-ignore
  apiUrl: import.meta.env["API_URL"],
// @ts-ignore
  production: import.meta.env["PRODUCTION"] == "true",
// @ts-ignore
  apiXrayLogsUrl: import.meta.env["API_XRAY_LOGS_URL"],
};
