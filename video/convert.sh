sips -i -l 2024-03-12_16.33.39.png 2024-03-12_16.34.13.png

ffmpeg -i 2024-03-12_16.33.39.png -i 2024-03-12_16.34.13.png -filter_complex hstack output.png

convert 2024-03-12_16.33.39.png \( -size 1x$(identify -format "%h" 2024-03-12_16.33.39.png) xc:black \) 2024-03-12_16.34.13.png +append output.png

