import os
import json
import eel.browsers
import routes.shaders as shaders

data_path = os.path.join(os.getenv("appdata"), "Ryujinx", "games")
game_list = dict()
title_id_list = os.listdir(data_path)


@eel.expose
def load_game_list():
    for index, title_id in enumerate(title_id_list, start=1):
        with open(os.path.join(data_path, title_id, "gui", "metadata.json")) as gameMetadata:
            data = json.load(gameMetadata)
            game_list[index] = {
                "id": title_id,
                "title": data["title"]
            }
    print(game_list)
    return game_list


def main():
    eel.browsers.set_path('electron', 'node_modules/electron/dist/electron')
    eel.init('static')
    # load_game_list()
    eel.start('index.html', mode='electron', jinja_templates='templates')


if __name__ == "__main__":
    main()
