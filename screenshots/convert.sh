WIDTH=1156
HEIGHT=1532
XOFFSET=534
YOFFSET=40
DOUBLEWIDTH=2313

convert "Screenshot 2024-03-15 (08.43.24).png" -crop "${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET}" \
        "Screenshot 2024-03-15 (08.46.37).png" -crop "${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET}" \
        \( -size 1x$(identify -format "%h" "Screenshot 2024-03-15 (08.43.24).png") xc:black \) \
        +append output2.png

convert output2.png -crop 5000x1532+0+0 output3.png
