"use strict";

var windowDefined = typeof window !== 'undefined';

function init(nodeList) {
  if (cancelInit()) {
    return false;
  }

  if (nodeList instanceof HTMLElement) {
    nodeList = [nodeList];
  }

  if (!nodeList.length) {
    return false;
  }

  for (var i = 0; i < nodeList.length; i++) {
    var node = nodeList[i];

    if (node instanceof HTMLElement) {
      clampLine(node);
    }
  }
}

function cancelInit() {
  if (!windowDefined || !window.getComputedStyle) {
    return true;
  }

  var div = document.createElement('div');

  if (div.style['-webkit-line-clamp'] === '') {
    return true;
  }

  return false;
}

function clampLine(node) {
  var maxHeight = getMaxHeight(node);
  var textNode = getTextNode(node);

  if (maxHeight === textNode.clientHeight) {
    return false;
  }

  for (var i = textNode.childNodes.length; i >= 0; i--) {
    var childNode = textNode.childNodes[i];

    if (childNode && (childNode.nodeType === 1 || childNode.nodeType === 3)) {
      var textContent = childNode.textContent;
      var textLength = textContent.length;

      while (textNode.clientHeight > maxHeight && textLength > 1) {
        textContent = textContent.substr(0, textLength - 1);
        textLength = textContent.length;
        childNode.textContent = textContent + "\u2026";
      }
    }
  }
}

function getTextNode(node) {
  var div = document.createElement('div');

  while (node.firstChild) {
    div.appendChild(node.firstChild);
  }

  node.appendChild(div);
  return div;
}

function getMaxHeight(node) {
  var styles = window.getComputedStyle(node);

  if (styles['max-height'] === 'none') {
    return Math.ceil(parseFloat(styles['height']));
  } else {
    return Math.ceil(parseFloat(styles['max-height']));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = init;
} else if (windowDefined) {
  window.Clamps = init;
}
