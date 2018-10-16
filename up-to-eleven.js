var browser = browser || chrome;
var enabled = false;

function doit(e) {
  if (enabled) {
    browser.browserAction.setIcon({
      path: {
        48: "icons/uptoeleven-disabled.png",
        96: "icons/uptoeleven-disabled.png"
      }
    })
    browser.tabs.executeScript({
        code: `
          window.__source.disconnect();
          window.__source.connect(window.__ac.destination);
          undefined;
      `
    });
  } else {
    browser.browserAction.setIcon({
      path: {
        48: "icons/uptoeleven-enabled.png",
        96: "icons/uptoeleven-enabled.png"
      }
    })
    browser.tabs.executeScript({
        code: `
          if (!window.__ac) {
            window.__ac = new AudioContext();
          }

          // brick-wall limiter to avoid output saturation.
          // This one has a makeup gain stage built-in
          var comp = new DynamicsCompressorNode(window.__ac, {ratio: 20.0, threshold: -50});

          // Increase the gain quite a lot. Maybe it would be good to make it
          // configurable.
          var gain = new GainNode(window.__ac, {gain: 10.0});

          if (!window.__source) {
            var element = document.querySelector("video");
            window.__source = new MediaElementAudioSourceNode(window.__ac, { mediaElement:
                                                                    element});
          } else {
            window.__source.disconnect();
          }
          window.__source.connect(gain).connect(comp).connect(window.__ac.destination);
          undefined;
      `
    });
  }
  enabled = !enabled;
}

browser.browserAction.onClicked.addListener(doit);
