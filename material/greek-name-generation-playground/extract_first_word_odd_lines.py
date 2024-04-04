def extract_first_word_odd_lines(filename):
    odd_line_words = []
    with open(filename, 'r') as file:
        lines = file.readlines()
        for i in range(0, len(lines), 2):  # Loop through odd lines
            line = lines[i].strip()
            if line:  # Check if line is not empty
                first_word = line.split()[1]
                odd_line_words.append(first_word)
    return odd_line_words

filename = "_GreekMythology.txt" # input("Enter the filename: ")
odd_line_first_words = extract_first_word_odd_lines(filename)
print("First word of each odd line:", odd_line_first_words)
