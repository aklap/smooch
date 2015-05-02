# smooch

I'm making a set of tools for viewing, converting, and creating KiSS dolls. 
KiSS stands for Kisaeke (Japanese for "dress up") Set System. KiSS dolls 
have been around for a long time, but there are no modern viewers and no 
way to play with these dolls online. Many very talented artists spent 
countless hours making these fun digital toys. Some are wonderful examples 
of pixel artistry. It would be a shame for them to be lost just because 
technology has moved on.

The first tool I'm making is cel2pnm. It converts the individual pixel
art cells to PNM files. PNM is a human-readable image format that can easily
be converted to other formats like PNG or GIF. Big thanks to Mark Dominus who 
told me about PNM and helped me code this during his residency at the Recurse 
Center. I also depended on Nick Lamb's GIMP plugin for learning how the cel
formats work.

## cel2pnm

You can use cel2pnm this way:

```(sh)
cel2pnm <image file> <palette file> <output file> 
```

Right now you can turn on debugging by tacking on the word "debug" (or, um,
any other word, really, oops, I need to learn out how to parse command line 
arguments). That will print the width, height, bits-per-pixel, and alllll the 
pixels in the cell.

KiSS cells always have a transparent color, color 0 in the palette. cel2pnm
will print the color in the format "rbg:x/x/x" where each is a hex value.

## Converting to png

Sorry, this is ugly.

```(sh)
pnmtopng -transparent `./cel2pnm examples/luna.cel examples/smoon.kcf examples/luna.pnm` examples/luna.pnm > luna.png
```

## Feedback

I would very much appreciate input on how to make this program better.

Right now, it only works on certain cell formats. It definitely doesn't work 
with Cherry KiSS or the older pre-"General KiSS Spec" cels. Others, it 
sometimes works and sometimes doesn't. I'm still trying to work out the kinks.

If you would like to help with this or other tools for KiSS, please let me know!
Email me at libby@daydrea.me, submit an issue, or send a pull request. THANKS!! :D
