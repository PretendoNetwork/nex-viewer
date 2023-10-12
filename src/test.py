import json

# Load the JSON file
with open('titles.json', 'r') as file:
    data = json.load(file)

# Define the name of the field you want to filter out
field_name_to_exclude = 'titleIds'

# Iterate through the list and filter elements without the specific field
filtered_elements = [element for element in data if field_name_to_exclude not in element]

# Print or process the filtered elements
for element in filtered_elements:
    print(element["name"])