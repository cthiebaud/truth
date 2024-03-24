ffmpeg -i input.mov -vcodec libx265 -crf 28 output.mp4

ffmpeg -i 2024-03-05_14.29.12.mov -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 28 output2.mp4


2024-03-05_14.29.12.mov

ffmpeg -i 2024-03-06_11.06.09.mov -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 28 2024-03-06_11.06.09-small.mp4
ffmpeg -i 2024-03-06_19.20.28.mov -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 28 2024-03-06_19.20.28-small.mp4
ffmpeg -i 2024-03-07_17.59.07.mov -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 28 2024-03-07_17.59.07-small.mp4


ffmpeg -i input_video.mp4 -filter_complex "[0:v]crop=in_w-100:in_h:100:0[cropped1]; [cropped1]crop=in_w-300:in_h:200:0[cropped2]" -map "[cropped2]" output_video.mp4


ffmpeg -i Aletheia_demo.mp4 -vf "scale=trunc(iw/4)*2:trunc(ih/4)*2" -c:v libx264 -crf 20 Aletheia_demo_smaller2.mp4


ffmpeg -i Aletheia_demo.mp4 -c:v libx264 -crf 20 Aletheia_demo_smaller2.mp4