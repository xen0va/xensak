import os
import json
import routes.shaders


data_path = os.getenv("appdata") + "\\Ryujinx\\games\\"

title_id_list = os.listdir(data_path)
game_list = dict()

for index, title_id in enumerate(title_id_list, start=1):
    with open(data_path + title_id + "\\gui\\metadata.json") as gameMetadata:
        data = json.load(gameMetadata)
        game_list[index] = {
            "id": title_id,
            "title": data["title"]
        }

for index, info in game_list.items():
    print(f"{index} - {info['title']} - {info['id']}")
print("\n")

selected_game = int(input("Select a game:"))
os.system('cls')

print(f"{selected_game} - {game_list[selected_game]['title']} - {game_list[selected_game]['id']}")

title_id = game_list[selected_game]['id']

routes.shaders.count_shaders(title_id, data_path)

print("1 - Download shaders")
print("2 - Upload shaders")
print("3 - Back")

selected_option = int(input("Pick an option"))

if selected_option == 1:
    routes.shaders.install_shaders(title_id, data_path)

if selected_option == 2:
    routes.shaders.share_shaders(title_id, data_path)
