ffmpeg -i input.mov -vcodec libx265 -crf 28 output.mp4

ffmpeg -i 2024-03-05_14.29.12.mov -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 28 output2.mp4


2024-03-05_14.29.12.mov