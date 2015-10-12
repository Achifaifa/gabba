#GABA

HTML5 Canvas demo built around the fact that GABA and gabba sound kinda similar. That's it, that's the joke.

Presented at Araba Encounter 01
Most Technical wild compo, 3rd place
Most Creative wild compo, 4th place

###About the demo:

It uses SFIS™ (Super Fast Image Switching) to animate a 3D model. The model was animated and rendered in blender. The rest of the artifacts are either canvas native (Drawings with the standard 2D context operations) or images. 

It uses unix time for timing, so it should work better in faster computers than the last one. 

The font used in the titles is [Quizma](http://www.1001freefonts.com/quizma.font)

###About the making:

First we tried three.js, but it failed.  
Then we tried the fallback to 2D, but it also failed.  
So we tried to use an animated GIF, but canvas doesn't support that.  
We then sliced the gif in frames, but canvas has a bug with gif placing  
So that's why we animated it with blender, exported png frames and switched them really fast  

It would be cool if this looked better, but 2.5 out of the 3 weeks we had to make the demo were spent trying to figure blender out. So screw it, this is good enough.  

Code/3D: Achifaifa [achi (at) hush (dot) ai]  
Music: Stage7 [stage7 (at) stg7 (dot) net]  


