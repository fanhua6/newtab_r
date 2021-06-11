// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file is not auto-generated from cr.js, because it's a
 * special case. cr.js holds a lot of functionality that is unnecessary in the
 * JS Module world, and auto-generating cr.m.js would require adding a lot of
 * logic in js_modulizer.py only to address the cr.js case, which is not worth
 * it.
 */
import { assert, assertNotReached } from './assert.m.js';
import { PromiseResolver } from './promise_resolver.m.js';

/** @typedef {{eventName: string, uid: number}} */
export let WebUIListener;

/**
 * Counter for use with createUid
 * @type {number}
 */
let uidCounter = 1;

/**
 * @return {number} A new unique ID.
 */
function createUid() {
  return uidCounter++;
}

/**
 * Dispatches a simple event on an event target.
 * @param {!EventTarget} target The event target to dispatch the event on.
 * @param {string} type The type of the event.
 * @param {boolean=} opt_bubbles Whether the event bubbles or not.
 * @param {boolean=} opt_cancelable Whether the default action of the event
 *     can be prevented. Default is true.
 * @return {boolean} If any of the listeners called {@code preventDefault}
 *     during the dispatch this will return false.
 */
export function dispatchSimpleEvent(target, type, opt_bubbles, opt_cancelable) {
  const e = new Event(type, {
    bubbles: opt_bubbles,
    cancelable: opt_cancelable === undefined || opt_cancelable
  });
  return target.dispatchEvent(e);
}

/**
 * Adds a {@code getInstance} static method that always return the same
 * instance object.
 * @param {!Function} ctor The constructor for the class to add the static
 *     method to.
 */
export function addSingletonGetter(ctor) {
  ctor.getInstance = function () {
    return ctor.instance_ || (ctor.instance_ = new ctor());
  };
}

/**
 * Fires a property change event on the target.
 * @param {!EventTarget} target The target to dispatch the event on.
 * @param {string} propertyName The name of the property that changed.
 * @param {*} newValue The new value for the property.
 * @param {*} oldValue The old value for the property.
 */
export function dispatchPropertyChange(
  target, propertyName, newValue, oldValue) {
  const e = new Event(propertyName + 'Change');
  e.propertyName = propertyName;
  e.newValue = newValue;
  e.oldValue = oldValue;
  target.dispatchEvent(e);
}


/**
 * The mapping used by the sendWithPromise mechanism to tie the Promise
 * returned to callers with the corresponding WebUI response. The mapping is
 * from ID to the PromiseResolver helper; the ID is generated by
 * sendWithPromise and is unique across all invocations of said method.
 * @type {!Object<!PromiseResolver>}
 */
const chromeSendResolverMap = {};

/**
 * The named method the WebUI handler calls directly in response to a
 * chrome.send call that expects a response. The handler requires no knowledge
 * of the specific name of this method, as the name is passed to the handler
 * as the first argument in the arguments list of chrome.send. The handler
 * must pass the ID, also sent via the chrome.send arguments list, as the
 * first argument of the JS invocation; additionally, the handler may
 * supply any number of other arguments that will be included in the response.
 * @param {string} id The unique ID identifying the Promise this response is
 *     tied to.
 * @param {boolean} isSuccess Whether the request was successful.
 * @param {*} response The response as sent from C++.
 */
export function webUIResponse(id, isSuccess, response) {
  const resolver = chromeSendResolverMap[id];
  delete chromeSendResolverMap[id];

  if (isSuccess) {
    resolver.resolve(response);
  } else {
    resolver.reject(response);
  }
}

/**
 * A variation of chrome.send, suitable for messages that expect a single
 * response from C++.
 * @param {string} methodName The name of the WebUI handler API.
 * @param {...*} var_args Variable number of arguments to be forwarded to the
 *     C++ call.
 * @return {!Promise}
 */
export function sendWithPromise(methodName, var_args) {
  const args = Array.prototype.slice.call(arguments, 1);
  const promiseResolver = new PromiseResolver();
  const id = methodName + '_' + createUid();
  chromeSendResolverMap[id] = promiseResolver;
  if(chrome && chrome.send) {
    chrome.send(methodName, [id].concat(args));
    return promiseResolver.promise;
  }else{
    return new Promise((resolve, reject) => {
      reject('chrome.send is undefined')
    })
  }
  
}

/**
 * A map of maps associating event names with listeners. The 2nd level map
 * associates a listener ID with the callback function, such that individual
 * listeners can be removed from an event without affecting other listeners of
 * the same event.
 * @type {!Object<!Object<!Function>>}
 */
const webUIListenerMap = {};

/**
 * The named method the WebUI handler calls directly when an event occurs.
 * The WebUI handler must supply the name of the event as the first argument
 * of the JS invocation; additionally, the handler may supply any number of
 * other arguments that will be forwarded to the listener callbacks.
 * @param {string} event The name of the event that has occurred.
 * @param {...*} var_args Additional arguments passed from C++.
 */
export function webUIListenerCallback(event, var_args) {
  const eventListenersMap = webUIListenerMap[event];
  if (!eventListenersMap) {
    // C++ event sent for an event that has no listeners.
    // TODO(dpapad): Should a warning be displayed here?
    return;
  }

  const args = Array.prototype.slice.call(arguments, 1);
  for (const listenerId in eventListenersMap) {
    eventListenersMap[listenerId].apply(null, args);
  }
}

/**
 * Registers a listener for an event fired from WebUI handlers. Any number of
 * listeners may register for a single event.
 * @param {string} eventName The event to listen to.
 * @param {!Function} callback The callback run when the event is fired.
 * @return {!WebUIListener} An object to be used for removing a listener via
 *     cr.removeWebUIListener. Should be treated as read-only.
 */
export function addWebUIListener(eventName, callback) {
  webUIListenerMap[eventName] = webUIListenerMap[eventName] || {};
  const uid = createUid();
  webUIListenerMap[eventName][uid] = callback;
  return { eventName: eventName, uid: uid };
}

/**
 * Removes a listener. Does nothing if the specified listener is not found.
 * @param {!WebUIListener} listener The listener to be removed (as returned by
 *     addWebUIListener).
 * @return {boolean} Whether the given listener was found and actually
 *     removed.
 */
export function removeWebUIListener(listener) {
  const listenerExists = webUIListenerMap[listener.eventName] &&
    webUIListenerMap[listener.eventName][listener.uid];
  if (listenerExists) {
    delete webUIListenerMap[listener.eventName][listener.uid];
    return true;
  }
  return false;
}

// Globally expose functions that must be called from C++.
window.cr = window.cr || {};
assert(!window.cr.webUIResponse);
assert(!window.cr.webUIListenerCallback);
window.cr.webUIResponse = webUIResponse;
window.cr.webUIListenerCallback = webUIListenerCallback;

/** Whether we are using a Mac or not. */
export const isMac = /Mac/.test(navigator.platform);

/** Whether this is on the Windows platform or not. */
export const isWindows = /Win/.test(navigator.platform);

/** Whether this is the ChromeOS/ash web browser. */
export const isChromeOS = (() => {
  let returnValue = false;
  // 
  return returnValue;
})();

/** Whether this is the ChromeOS/Lacros web browser. */
export const isLacros = (() => {
  let returnValue = false;
  // 
  return returnValue;
})();

/** Whether this is on vanilla Linux (not chromeOS). */
export const isLinux = /Linux/.test(navigator.userAgent);

/** Whether this is on Android. */
export const isAndroid = /Android/.test(navigator.userAgent);

/** Whether this is on iOS. */
export const isIOS = /CriOS/.test(navigator.userAgent);

/**
 * Converts a camelCase javascript property name to a hyphenated-lower-case
 * attribute name.
 * @param {string} jsName The javascript camelCase property name.
 * @return {string} The equivalent hyphenated-lower-case attribute name.
 */
function getAttributeName(jsName) {
  return jsName.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/**
 * The kind of property to define in {@code getPropertyDescriptor}.
 * @enum {string}
 * @const
 */
export const PropertyKind = {
  /**
   * Plain old JS property where the backing data is stored as a "private"
   * field on the object.
   * Use for properties of any type. Type will not be checked.
   */
  JS: 'js',

  /**
   * The property backing data is stored as an attribute on an element.
   * Use only for properties of type {string}.
   */
  ATTR: 'attr',

  /**
   * The property backing data is stored as an attribute on an element. If the
   * element has the attribute then the value is true.
   * Use only for properties of type {boolean}.
   */
  BOOL_ATTR: 'boolAttr'
};

/**
 * Helper function for getPropertyDescriptor that returns the getter to use for
 * the property.
 * @param {string} name The name of the property.
 * @param {PropertyKind} kind The kind of the property.
 * @return {function():*} The getter for the property.
 */
function getGetter(name, kind) {
  let attributeName;
  switch (kind) {
    case PropertyKind.JS:
      const privateName = name + '_';
      return function () {
        return this[privateName];
      };
    case PropertyKind.ATTR:
      attributeName = getAttributeName(name);
      return function () {
        return this.getAttribute(attributeName);
      };
    case PropertyKind.BOOL_ATTR:
      attributeName = getAttributeName(name);
      return function () {
        return this.hasAttribute(attributeName);
      };
    default:
      break;
  }

  assertNotReached();
}

/**
 * Helper function for getPropertyDescriptor that returns the setter of the
 * right kind.
 * @param {string} name The name of the property we are defining the setter
 *     for.
 * @param {PropertyKind} kind The kind of property we are getting the
 *     setter for.
 * @param {function(*, *):void=} opt_setHook A function to run after the
 *     property is set, but before the propertyChange event is fired.
 * @return {function(*):void} The function to use as a setter.
 */
function getSetter(name, kind, opt_setHook) {
  let attributeName;
  switch (kind) {
    case PropertyKind.JS:
      const privateName = name + '_';
      return function (value) {
        const oldValue = this[name];
        if (value !== oldValue) {
          this[privateName] = value;
          if (opt_setHook) {
            opt_setHook.call(this, value, oldValue);
          }
          dispatchPropertyChange(this, name, value, oldValue);
        }
      };

    case PropertyKind.ATTR:
      attributeName = getAttributeName(name);
      return function (value) {
        const oldValue = this[name];
        if (value !== oldValue) {
          if (value === undefined) {
            this.removeAttribute(attributeName);
          } else {
            this.setAttribute(attributeName, value);
          }
          if (opt_setHook) {
            opt_setHook.call(this, value, oldValue);
          }
          dispatchPropertyChange(this, name, value, oldValue);
        }
      };

    case PropertyKind.BOOL_ATTR:
      attributeName = getAttributeName(name);
      return function (value) {
        const oldValue = this[name];
        if (value !== oldValue) {
          if (value) {
            this.setAttribute(attributeName, name);
          } else {
            this.removeAttribute(attributeName);
          }
          if (opt_setHook) {
            opt_setHook.call(this, value, oldValue);
          }
          dispatchPropertyChange(this, name, value, oldValue);
        }
      };
    default:
      break;
  }

  assertNotReached();
}

/**
 * Returns a getter and setter to be used as property descriptor in
 * Object.defineProperty(). When the setter changes the value a property change
 * event with the type {@code name + 'Change'} is fired.
 * @param {string} name The name of the property.
 * @param {PropertyKind=} opt_kind What kind of underlying storage to use.
 * @param {function(?, ?):void=} opt_setHook A function to run after the
 *     property is set, but before the propertyChange event is fired.
 */
export function getPropertyDescriptor(name, opt_kind, opt_setHook) {
  const kind = /** @type {PropertyKind} */ (opt_kind || PropertyKind.JS);

  return {
    get: getGetter(name, kind),
    set: getSetter(name, kind, opt_setHook),
  };
}
