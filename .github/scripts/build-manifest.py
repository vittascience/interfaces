#!/usr/bin/env python3
"""Generate manifest/ describing every openInterface/<slug>/ folder at HEAD.

manifest/index.json  -> {"commit": <sha>, "interfaces": {<slug>: <tree sha>}}
manifest/<slug>.json -> [{"path": <relative path>, "size": <bytes>}, ...]

Read by the vitta-mobile app through raw.githubusercontent.com.
Uses only the Git object database (no file reads), Python 3 stdlib only.
"""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = "openInterface"
OUT = ROOT / "manifest"


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, check=True, capture_output=True).stdout


def ls_tree(*args):
    """Yield (mode, type, sha, size, path) from `git ls-tree -l -z`."""
    for entry in git("ls-tree", "-l", "-z", *args).split(b"\0"):
        if not entry:
            continue
        meta, path = entry.split(b"\t", 1)
        mode, kind, sha, size = meta.decode().split()
        yield mode, kind, sha, size, path.decode("utf-8")


def write_json(path, text):
    path.write_text(text, encoding="utf-8", newline="\n")


def main():
    commit = git("rev-parse", "HEAD").decode().strip()

    interfaces = {}
    for _, kind, sha, _, path in ls_tree(commit, f"{SRC}/"):
        if kind == "tree":
            slug = path[len(SRC) + 1:]
            interfaces[slug] = git("rev-parse", f"{commit}:{SRC}/{slug}").decode().strip()

    files = {slug: [] for slug in interfaces}
    for _, kind, _, size, path in ls_tree("-r", commit, f"{SRC}/"):
        if kind != "blob":
            continue
        slug, _, rel = path[len(SRC) + 1:].partition("/")
        if rel:
            files[slug].append({"path": rel, "size": int(size)})

    OUT.mkdir(exist_ok=True)
    write_json(OUT / "index.json",
               json.dumps({"commit": commit, "interfaces": dict(sorted(interfaces.items()))},
                          indent=2, ensure_ascii=False) + "\n")
    for slug, entries in files.items():
        entries.sort(key=lambda e: e["path"])
        lines = ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in entries)
        write_json(OUT / f"{slug}.json", f"[\n{lines}\n]\n" if entries else "[]\n")

    for stale in OUT.glob("*.json"):
        if stale.name != "index.json" and stale.stem not in interfaces:
            stale.unlink()


if __name__ == "__main__":
    main()
