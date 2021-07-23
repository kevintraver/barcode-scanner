import { Plugins } from "@capacitor/core";

const { BarcodeScanner } = Plugins;

const didUserGrantPermission = async () => {
  // check if user already granted permission
  const status = await BarcodeScanner.checkPermission({ force: false });

  if (status.granted) {
    // user granted permission
    return true;
  }

  if (status.denied) {
    // user denied permission
    return false;
  }

  if (status.asked) {
    // system requested the user for permission during this call
    // only possible when force set to true
  }

  if (status.neverAsked) {
    // user has not been requested this permission before
    // it is advised to show the user some sort of prompt
    // this way you will not waste your only chance to ask for the permission
    // eslint-disable-next-line no-restricted-globals
    const c = confirm(
      "We need your permission to use your camera to be able to scan barcodes"
    );
    if (!c) {
      return false;
    }
  }

  if (status.restricted || status.unknown) {
    // ios only
    // probably means the permission has been denied
    return false;
  }

  // user has not denied permission
  // but the user also has not yet granted the permission
  // so request it
  const statusRequest = await BarcodeScanner.checkPermission({ force: true });

  if (statusRequest.asked) {
    // system requested the user for permission during this call
    // only possible when force set to true
  }

  if (statusRequest.granted) {
    // the user did grant the permission now
    return true;
  }

  // user did not grant the permission, so he must have declined the request
  return false;
};

export const getScanContent = async () => {
  const permissionGranted = await didUserGrantPermission()
  if (permissionGranted) {
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    document.body.classList.add("qrscanner");
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    document.body.classList.remove("qrscanner");

    if (result.hasContent) {
      return result.content;
    }
  }
  return null;
};

export const cancelScan = () => {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  document.body.classList.remove("qrscanner");
};
