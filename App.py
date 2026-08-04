"""
app.py
------
Servidor local para probar la página antes de subirla.

Uso:
    pip install flask
    python app.py

Luego abre: http://localhost:5000

Cada vez que entras a la página (o recargas), este servidor vuelve a
revisar la carpeta /media y actualiza media/manifest.json solo, así
que puedes ir arrastrando fotos/videos a /media y recargar el navegador
para verlos aparecer, sin reiniciar nada.
"""

import json
import os
from pathlib import Path

from flask import Flask, send_from_directory

BASE_DIR = Path(__file__).parent
MEDIA_DIR = BASE_DIR / "media"
MANIFEST_FILE = MEDIA_DIR / "manifest.json"

IMAGE_EXT = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
VIDEO_EXT = {".mp4", ".mov", ".webm"}

app = Flask(__name__, static_folder=None)


def build_manifest():
    """Escanea /media y regenera manifest.json con lo que encuentre."""
    MEDIA_DIR.mkdir(exist_ok=True)

    items = []
    for name in sorted(os.listdir(MEDIA_DIR), key=str.casefold):
        if name == "manifest.json" or name.startswith("."):
            continue
        ext = Path(name).suffix.lower()
        if ext in IMAGE_EXT:
            items.append({"file": f"media/{name}", "type": "image"})
        elif ext in VIDEO_EXT:
            items.append({"file": f"media/{name}", "type": "video"})

    MANIFEST_FILE.write_text(json.dumps(items, indent=2, ensure_ascii=False))
    print(f"Galería actualizada: {len(items)} archivo(s) en /media")


@app.before_request
def refresh_gallery():
    build_manifest()


@app.route("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/media/<path:filename>")
def media_files(filename):
    return send_from_directory(MEDIA_DIR, filename)


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(BASE_DIR, filename)


if __name__ == "__main__":
    build_manifest()
    print("Abriendo en http://localhost:5001")
    app.run(debug=True, port=5001)