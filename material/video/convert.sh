sips -i -l 'Screenshot 2024-03-12 at 17.55.36.png' 2024-03-12_16.34.13.png

ffmpeg -i 'Screenshot 2024-03-12 at 17.55.36.png' -i 2024-03-12_16.34.13.png -filter_complex hstack output.png

convert 'Screenshot 2024-03-12 at 17.55.36.png' \( -size 1x$(identify -format "%h" 'Screenshot 2024-03-12 at 17.55.36.png') xc:black \) 'Screenshot 2024-03-12 at 17.56.33.png' +append output.png

