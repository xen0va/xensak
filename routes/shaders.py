import os
import requests
import zipfile
import io


def count_shaders(title_id, data_path):
    shader_toc_file = data_path + title_id + "\\cache\\shader\\shared.toc"

    if not os.path.exists(shader_toc_file):
        return 0

    with open(shader_toc_file, "r+b") as f:
        f.seek(4)
        buffer = f.read(8)

        cache_version = int.from_bytes(buffer[:4], byteorder='little')

    print(f"Cache version: {cache_version}")

    #needs to be replaced with a variable
    if cache_version < 65537:
        return 0

    stat = os.stat(shader_toc_file)
    print(max((stat.st_size - 32) / 8, 0))


def install_shaders(title_id, data_path):
    shader_cache_dir = data_path + title_id + "\\cache\\shader\\"

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

def share_shaders():
    print("WIP")