import yaml

def extract_entities(filename):
    entities = []
    with open(filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        for i in range(0, len(lines), 2):  # Loop through odd lines
            name = lines[i].split()[0]  # Get the first word as name
            didascalia = lines[i].split(maxsplit=1)[1].strip()  # Get the rest of the line as didascalia
            description = lines[i+1].strip()  # Get the next even line as description
            entity = {'name': name, 'didascalia': didascalia, 'description': description}
            entities.append(entity)
    return entities

def generate_yaml(entities, output_filename):
    with open(output_filename, 'w', encoding='utf-8') as file:
        yaml.dump_all(entities, file, allow_unicode=True)

input_filename = "_GreekMythology.txt"
output_filename = "entities.yaml"

entities = extract_entities(input_filename)
generate_yaml(entities, output_filename)
