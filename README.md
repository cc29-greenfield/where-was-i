
![NSGIF](https://dl.dropboxusercontent.com/s/0rq3fr0dtpvwd4h/NSGIF-header.png?dl=0)

Where was I?! is an progress tracker application to help you never forget which episode was the last one you watched


Check out [_this example_](http://files.parsetfss.com/2677410f-fd15-46aa-a2fa-258c85d4da30/tfss-2215cfe6-03b5-4546-8422-d292f875efb9-whom.gif). 

_Sometimes we need to deal with GIFs in Cocoa. This can really be a pain in the ass (believe me). And here comes our hero :octocat:. Breaking through errors and glitches and generating smooth GIFs :dash:._

## How it works
![NSGIF](https://dl.dropboxusercontent.com/s/nsh0s1shh9fbqpu/NSGIF-HIW.png?dl=0)
That's it really. Although iOS defaults to .MOV for recordings you can also use .AVI and .MP4. If you want to go into some technical details though, here they are:

## Add to your project

There are 2 ways you can add NSGIF to your project:

### Manual installation

Simply import the 'NSGIF' into your project then import the following in the class you want to use it: 
```objective-c
#import "NSGIF.h"
```      
### Installation with CocoaPods

CocoaPods is a dependency manager for Objective-C, which automates and simplifies the process of using 3rd-party libraries like NSGIF in your projects. See the "[Getting Started](http://guides.cocoapods.org/syntax/podfile.html)" guide for more information.

### Podfile
```ruby
platform :ios, '7.0'
pod "NSGIF", "~> 1.0"
```

## Practical use
```objective-c
[NSGIF optimalGIFfromURL:url loopCount:0 completion:^(NSURL *GifURL) {
    NSLog(@"Finished generating GIF: %@", GifURL);
}];
```
This generates a GIF from the provided video, by automatically setting the best frame count, delay time and size.

If you want some more flexibility you can use:
```objective-c
[NSGIF createGIFfromURL:url withFrameCount:30 delayTime:.010 loopCount:0 completion:^(NSURL *GifURL) {
    NSLog(@"Finished generating GIF: %@", GifURL);
}];
```
The library is lightweight and very straight forward. Once you grab the URL of your video, pass it to NSGIF alongside the frame count, delay time and loop count. 
Let me explain those for you: 
```
frameCount - is the amount of frames of the GIF. You can adjust this depending on the resolution of your video. The higher the resolution the lower to frame count!
delayTime  -  is the amount of time for each frame in the GIF.
loopCount  - is the number of times the GIF will repeat. Defaults to 0, which means repeat infinitely.
```
I recommend you to play with those values and find the best ones for your video.

## Demo

Check out the demo project for a quick example of how Where was I?! works. After you log in all your shows will be displayed, and all you have to do is select the show that you were watching last to check your progress, just like that:

![NSGIF](https://dl.dropboxusercontent.com/s/p02c6l7rzk6mf6m/NSGIF-HT.gif?dl=0)

## Todo
- [ ] Render Deployment
  - [ ] Render Account.
  - [ ] Render Side Setup (DB / Server)
  - [ ] Project side Package.JSON && Knex Setup
- [ ] TheMovieDB.org Authentication METHOD
- [ ] README page
- [ ] Database
  - [ ] Seed files (Only for tests)
  - [ ] Create tests
  - [ ] Model Side

Feel free to try it out now!

## License
Usage is provided under the [MIT License](http://http//opensource.org/licenses/mit-license.php). See LICENSE for the full details.

