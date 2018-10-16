# Up To Eleven

A Web Extension that inserts a Web Audio API `GainNode` and `DynamicsCompressor`
node to increase the audio level of videos that are too quiet, while limiting
the maximum volume of those videos.

A few examples:
- https://www.youtube.com/watch?v=23lRkdDXqY0
- https://www.youtube.com/watch?v=FJoYZUMOwM4

This is a proof of concept: the input gain to the compressor is fixed, and the
compressor parameters are fixed as well. A byproduct of this technique is that
the background noise is going to be increased.

- Firefox: <https://addons.mozilla.org/firefox/addon/up-to-eleven/>
- Chrome: It works but I haven't bothered uploading it to their site, let me know
if anybody is interested

![Up to eleven](https://66.media.tumblr.com/tumblr_m9rgdaADZO1qiz3j8o1_500.gif)
