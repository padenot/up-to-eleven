var browser = browser || chrome

function doit(e) {
  browser.tabs.executeScript({
      code: `
        var element = document.querySelector("video");
        var ac = new AudioContext();
        // brick-wall limiter to avoid output saturation.
        // This one has a makeup gain stage built-in
        var comp = new DynamicsCompressorNode(ac, {ratio: 20.0});
        // Increase the gain quite a lot. Maybe it would be good to make it
        // configurable.
        var gain = new GainNode(ac, {gain: 10.0});
        var source = new MediaElementAudioSourceNode(ac, { mediaElement:
                                                           element });
        source.connect(gain).connect(comp).connect(ac.destination);
        undefined;
    `
  });
}

browser.browserAction.onClicked.addListener(doit);
