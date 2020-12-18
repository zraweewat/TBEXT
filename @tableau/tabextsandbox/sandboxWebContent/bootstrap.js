'use strict';

console.log('Extension sandbox script loading...');

let safelist = [
  {browser: "Chrome", minVer: 61},
  {browser: "HeadlessChrome", minVer: 61},
  {browser: "Edge", minVer: 16},
  {browser: "Firefox", minVer: 23},
  // confusingly, safari uses 'Version/' as well as 'Safari'. We are choosing Safari/.
  {browser: "Safari", minVer: 605},
];

let blocklist = [];

let isBlockedBrowser = true;

// Sample user agent string
//  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36"
for (let s of safelist) {
  let r = new RegExp(` ${s.browser}\\/(\\d+)\\.[0-9\\.]+`);
  let match = navigator.userAgent.match(r);
  if (match && match[1] && parseInt(match[1]) >= s.minVer) {
    isBlockedBrowser = false;
    break;
  }
}

for (let r of blocklist) {
  if (navigator.userAgent.match(r)) {
    isBlockedBrowser = true;
    break;
  }
}

const ACCEPT_LANG_CODE = '<%- acceptLanguageCode %>';
const ERROR_ELEMENT_CLASS = 'error-class';
const ERROR_ELEMENT_ID = 'error';
const TRANSLATIONS_LIST = <%- translationsMap %>;
const UNSUPPORTED_VERSION_TIMEOUT = 2000;

let contentLoaded = false;
let translatedContent = getTranslatedContent();

// We get the iframe here by tag name because we can't share the id of the frame easily across browser
//  and nodejs. Which means if the id changes, this could easily break. At the time of this writing
//  the likelihood that there are multiple iframes on this page is extremely low.
let extensionFrame = document.getElementsByTagName('iframe')[0];
let extensionWindow = extensionFrame.contentWindow;

window.onload = function () {

  <% if (disableTableauVersionCheck) { %>
    loadExtensionContent();
  <% } else { %>
    // initiate handshake with api-platform
    requestHandshake();

    // Wait for a specified timeout before throwing an unsuported version error. 2019.3+ versions send an ACK for the HANDSHAKE.
    // Older versions don't send an ACK and we'll throw an unsupported version error.
    setTimeout(setUnsupportedVersionError, UNSUPPORTED_VERSION_TIMEOUT);
  <% } %>
};

// add listener for version ACK and message forwarding
window.addEventListener('message', receiveMessage, false);

// ============================= Utils ===========================================================================

function getTranslatedContent() {
  let targetLocale = ACCEPT_LANG_CODE ? ACCEPT_LANG_CODE : getNavigatorLanguage();
  if (TRANSLATIONS_LIST[targetLocale]) { // full match
    return TRANSLATIONS_LIST[targetLocale];
  }

  // at this point, we're just trying to match the language code in tableau's locale list
  let idx = targetLocale.indexOf('-');
  let targetLang = idx >=0 ? targetLocale.substring(0, idx) : targetLocale;
  var partialMatchLocales = Object.keys(TRANSLATIONS_LIST).filter(function (locale) { // partial match
    return locale.indexOf(targetLang) === 0;
  });

  return partialMatchLocales.length > 0 ? TRANSLATIONS_LIST[partialMatchLocales[0]] : TRANSLATIONS_LIST['en'];
}

function getNavigatorLanguage() {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

// ====================================== Handler methods ==========================================================

function receiveMessage(event) {
  let msgType = event.data.msgType;
  if (msgType != 'v-ack') {
    forwardMessage(event);
  }
  else {  // receive ACK
    if (isBlockedBrowser) {
      console.log(`Browser user agent rejected:\n${navigator.userAgent}`);
      displayErrorContent(translatedContent.unsupportedBrowserError);
    }
    else {
      loadExtensionContent();
    }
  }
}

function forwardMessage(event) {
  /**
   * window.opener works for the specific case of ServerUINamespaceHandler.
   * DesktopUINamespaceHandler has a parent iframe (The window.opener is on that parent frame).
   */
  let destination = window.opener ? window.opener : window.parent;
  if (event.source == destination) {
    extensionWindow.postMessage(event.data, '*');
  } else {
    destination.postMessage(event.data, '*');
  }
}

function loadExtensionContent() {
  extensionFrame.src = '<%= extensionContentPath %>';
  extensionFrame.style.display = 'block';
  contentLoaded = true;
  console.log('Extension sandbox window.load done.');
}

function requestHandshake() {
  let guid = '<%= guid %>';
  if (!guid) {
    console.error('Sandbox frame did not pass valid GUID.');
    return;
  }
  let data = {
    msgGuid: guid,
    msgType: 'v-handshake'
  }
  // Posting to the iframe that runs api-js-platform
  window.parent.postMessage(data, '*');
}

function setUnsupportedVersionError() {
  if (!contentLoaded) {
    let errMsg = translatedContent.unsupportedVersionError;
    console.error(errMsg);
    displayErrorContent(errMsg);
  }
}

function displayErrorContent(errorMsg) {
  extensionFrame.parentElement.removeChild(extensionFrame);
  var errorDiv = document.createElement('div');
  errorDiv.innerHTML = errorMsg;
  errorDiv.className = ERROR_ELEMENT_CLASS;
  errorDiv.id = ERROR_ELEMENT_ID;
  document.body.appendChild(errorDiv);
}
