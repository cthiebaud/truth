WIDTH=$( expr 580 \* 2 )
HEIGHT=$( expr 844 \* 2 )
XOFFSET=$( expr 834 \- 580 )
YOFFSET=40
TOTALWIDTH=$( expr 10 \+ \( $WIDTH \* 2 \) )

echo "${WIDTH}" x "${HEIGHT}" + "${XOFFSET}" + "${YOFFSET}" V "${TOTALWIDTH}"

convert "Screenshot 2024-03-20 (11.46.02).png" -crop ${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET} \
        "Screenshot 2024-03-20 (11.47.11).png" -crop ${WIDTH}x${HEIGHT}+${XOFFSET}+${YOFFSET} \
        -splice 10x0 -background "#ffffff" +append "2024-03-20_${TOTALWIDTH}x${HEIGHT}_0.jpg"

convert "2024-03-20_${TOTALWIDTH}x${HEIGHT}_0.jpg" -crop "+10+0" "2024-03-20_${TOTALWIDTH}x${HEIGHT}.jpg"

rm -f "2024-03-20_${TOTALWIDTH}x${HEIGHT}_0.jpg"
