WIDTH=1156
HEIGHT=1532
XOFFSET=534
YOFFSET=40
TOTALWIDTH=2322

convert "image1.png" -crop ${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET} \
        "image2.png" -crop ${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET} \
        -splice 10x0 -background "#ffffff" +append "2024-03-15_${TOTALWIDTH}x${HEIGHT}0.jpg"

convert "2024-03-15_${TOTALWIDTH}x${HEIGHT}0.jpg" -crop "+10+0" "2024-03-15_${TOTALWIDTH}x${HEIGHT}.jpg"
