import os
import eel
import requests
import zipfile
from os.path import basename

data_path = os.path.join(os.getenv("appdata"), "Ryujinx", "games")


@eel.expose
def count_shaders(title_id):
    shader_toc_file = os.path.join(data_path, title_id, "cache", "shader", "shared.toc")

    if not os.path.exists(shader_toc_file):
        return 0

    with open(shader_toc_file, "r+b") as f:
        f.seek(4)
        buffer = f.read(8)

        cache_version = int.from_bytes(buffer[:4], byteorder='little')

    print(f"Cache version: {cache_version}")

    # needs to be replaced with a variable
    if cache_version < 65537:
        return 0

    stat = os.stat(shader_toc_file)
    return max((stat.st_size - 32) / 8, 0)


@eel.expose
def install_shaders(title_id):
    shader_cache_dir = os.path.join(data_path, title_id, "cache", "shader")

    if not os.path.exists(shader_cache_dir):
        print("Directory not found, creating folders")
        os.makedirs(shader_cache_dir)
        print(shader_cache_dir)

    r = requests.get(f"http://localhost:8080/nintendo/shaders/{title_id}.zip")

    if r.status_code == 200:
        with open(shader_cache_dir + f"{title_id}.zip", 'wb') as f:
            f.write(r.content)
    else:
        print(f"Download failed: {r.status_code}")

    with zipfile.ZipFile(shader_cache_dir + f"{title_id}.zip") as shaderZip:
        shaderZip.extractall(shader_cache_dir)

    os.remove(shader_cache_dir + f"{title_id}.zip")


@eel.expose
def share_shaders(title_id):

    shader_cache_dir = data_path + title_id + "\\cache\\shader\\"
    shader_zip_dir = shader_cache_dir + title_id + ".zip"
    shader_file_list = ['guest.toc', 'guest.data', 'shared.toc', 'shared.data']

    try:
        with zipfile.ZipFile(shader_zip_dir, 'w') as shader_cache_zip:
            for file in shader_file_list:
                shader_cache_zip.write(shader_cache_dir + file, basename(file))

        with open(shader_zip_dir, 'rb') as file:
            files = {'file': file}

            print("Uploading...")
            r = requests.post("http://localhost:8080/upload", files=files)

            if r.status_code == 201:
                print("Upload successful")
            else:
                print(f"Upload failed: {r.status_code}")

    except Exception as e:
        print(e)
