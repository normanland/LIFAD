# %%
import time
from datetime import date
from io import StringIO
from pathlib import Path
from urllib.parse import quote

import pandas as pd
import requests
from bs4 import BeautifulSoup


# %%
# project settings

project_folder = Path.home() / "Documents" / "LIFAD"

current_csv = project_folder / "lifad_tracks.csv"
new_csv = project_folder / "lifad_tracks_new.csv"

lastfm_url = "https://ws.audioscrobbler.com/2.0/"

kworb_url = (
    "https://kworb.net/spotify/artist/"
    "6wWVKhxIU2cEi0K81v7HvP_songs.html"
)

api_key = input("Enter your Last.fm API key: ").strip()

if not api_key:
    raise ValueError("Last.fm API key is required.")


# %%
# lifad track list

tracks = [
    [1, 1, 1, "Rammlied", "Rammlied", "Standard", False],
    [2, 1, 2, "Ich tu dir weh", "Ich tu dir weh", "Standard", False],
    [3, 1, 3, "Waidmanns Heil", "Waidmanns Heil", "Standard", False],
    [4, 1, 4, "Haifisch", "Haifisch", "Standard", False],
    [5, 1, 5, "B********", "B********", "Standard", False],
    [6, 1, 6, "Frühling in Paris", "Frühling in Paris", "Standard", False],
    [7, 1, 7, "Wiener Blut", "Wiener Blut", "Standard", False],
    [8, 1, 8, "Pussy", "Pussy", "Standard", False],
    [9, 1, 9, "Liebe ist für alle da", "Liebe ist für alle da", "Standard", False],
    [10, 1, 10, "Mehr", "Mehr", "Standard", False],
    [11, 1, 11, "Roter Sand", "Roter Sand", "Standard", False],

    [12, 2, 1, "Führe mich", "Führe mich", "Special Edition", True],
    [13, 2, 2, "Donaukinder", "Donaukinder", "Special Edition", True],
    [14, 2, 3, "Halt", "Halt", "Special Edition", True],
    [
        15,
        2,
        4,
        "Roter Sand (Orchester Version)",
        "Roter Sand",
        "Special Edition",
        True
    ],
    [16, 2, 5, "Liese", "Liese", "Special Edition", True]
]


# %%
# extracting values from rammwiki

def extract_value(lines, label):
    if label not in lines:
        return None

    index = lines.index(label)

    if index + 2 < len(lines) and lines[index + 1] == ":":
        return lines[index + 2]

    if index + 1 < len(lines):
        return lines[index + 1]

    return None


def duration_to_seconds(value):
    if pd.isna(value):
        return None

    minutes, seconds = value.split(":")

    return int(minutes) * 60 + int(seconds)


# %%
# collecting rammwiki data

def scrape_track(track, session):
    (
        album_order,
        disc_number,
        disc_track_number,
        track_name,
        page_name,
        edition,
        bonus_track
    ) = track

    page_name = page_name.replace(" ", "_")
    encoded_name = quote(page_name, safe="_*")

    url = f"https://ramm.wiki/{encoded_name}_(song)"

    response = session.get(
        url,
        timeout=20
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    text = soup.get_text(
        "\n",
        strip=True
    )

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    return {
        "album_order": album_order,
        "disc_number": disc_number,
        "disc_track_number": disc_track_number,
        "track_name": track_name,
        "edition": edition,
        "bonus_track": bonus_track,
        "gema": extract_value(lines, "GEMA"),
        "iswc": extract_value(lines, "ISWC"),
        "working_title": extract_value(
            lines,
            "Working title:"
        ),
        "first_release": extract_value(
            lines,
            "First release:"
        ),
        "duration": extract_value(
            lines,
            "Length:"
        ),
        "bpm": extract_value(
            lines,
            "Tempo:"
        ),
        "key": extract_value(
            lines,
            "Key:"
        ),
        "live_debut": extract_value(
            lines,
            "Live debut:"
        ),
        "last_performed": extract_value(
            lines,
            "Last performed:"
        ),
        "live_count": extract_value(
            lines,
            "Live count:"
        ),
        "source_url": url
    }


rammwiki_session = requests.Session()

rammwiki_session.headers.update({
    "User-Agent": "LIFAD-Data-Analysis-Project/1.0"
})


rammwiki_rows = []

for track in tracks:
    track_name = track[3]

    print(f"Collecting RammWiki: {track_name}")

    try:
        track_data = scrape_track(
            track,
            rammwiki_session
        )

        rammwiki_rows.append(
            track_data
        )

    except Exception as error:
        print(
            f"Error: {track_name} -> {error}"
        )

    time.sleep(1)


df_tracks = pd.DataFrame(
    rammwiki_rows
)


# %%
# checking rammwiki result

if len(df_tracks) != 16:
    raise ValueError(
        f"Expected 16 tracks, found {len(df_tracks)}."
    )

if df_tracks["track_name"].duplicated().any():
    raise ValueError(
        "Duplicate track names found."
    )


# %%
# fixing orchestra version

orchestra_mask = (
    df_tracks["track_name"]
    == "Roter Sand (Orchester Version)"
)

df_tracks.loc[
    orchestra_mask,
    "duration"
] = "04:07"

df_tracks.loc[
    orchestra_mask,
    "gema"
] = "11007918-002"

df_tracks.loc[
    orchestra_mask,
    "iswc"
] = "T-802.757.586-7"


# %%
# cleaning rammwiki data

df_tracks["bpm"] = pd.to_numeric(
    df_tracks["bpm"],
    errors="coerce"
)

df_tracks["live_count"] = pd.to_numeric(
    df_tracks["live_count"],
    errors="coerce"
)


df_tracks["duration_sec"] = (
    df_tracks["duration"]
    .apply(duration_to_seconds)
)


date_columns = [
    "first_release",
    "live_debut",
    "last_performed"
]

for column in date_columns:
    df_tracks[column] = pd.to_datetime(
        df_tracks[column],
        errors="coerce",
        dayfirst=True
    )


df_tracks["retrieved_at"] = date.today()


# %%
# collecting last.fm data

lastfm_session = requests.Session()

lastfm_session.headers.update({
    "User-Agent": "LIFAD-Data-Analysis-Project/1.0"
})


def get_lastfm_data(track_name):
    params = {
        "method": "track.getInfo",
        "api_key": api_key,
        "artist": "Rammstein",
        "track": track_name,
        "autocorrect": 1,
        "format": "json"
    }

    response = lastfm_session.get(
        lastfm_url,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    if "error" in data:
        raise ValueError(
            data.get(
                "message",
                "Unknown Last.fm error"
            )
        )

    track = data.get(
        "track",
        {}
    )

    listeners = track.get(
        "listeners"
    )

    playcount = track.get(
        "playcount"
    )

    return {
        "lastfm_name": track.get("name"),
        "lastfm_listeners": (
            int(listeners)
            if listeners else None
        ),
        "lastfm_playcount": (
            int(playcount)
            if playcount else None
        ),
        "lastfm_mbid": (
            track.get("mbid") or None
        ),
        "lastfm_url": track.get("url")
    }


lastfm_rows = []

for track_name in df_tracks["track_name"]:
    print(
        f"Collecting Last.fm: {track_name}"
    )

    try:
        data = get_lastfm_data(
            track_name
        )

    except Exception as error:
        print(
            f"Error: {track_name} -> {error}"
        )

        data = {
            "lastfm_name": None,
            "lastfm_listeners": None,
            "lastfm_playcount": None,
            "lastfm_mbid": None,
            "lastfm_url": None
        }

    lastfm_rows.append(
        data
    )

    time.sleep(1)


df_lastfm = pd.DataFrame(
    lastfm_rows
)


for column in df_lastfm.columns:
    df_tracks[column] = (
        df_lastfm[column]
    )


# %%
# repeat listening metric

df_tracks["scrobbles_per_listener"] = (
    df_tracks["lastfm_playcount"]
    / df_tracks["lastfm_listeners"]
).round(2)


df_tracks["lastfm_retrieved_at"] = (
    date.today()
)


# %%
# collecting spotify data

headers = {
    "User-Agent": (
        "Mozilla/5.0 "
        "(Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 "
        "Chrome/153.0 Safari/537.36"
    )
}


response = requests.get(
    kworb_url,
    headers=headers,
    timeout=20
)

response.raise_for_status()

response.encoding = "utf-8"


tables = pd.read_html(
    StringIO(response.text)
)


spotify_table = None

for table in tables:
    columns = [
        str(column).strip()
        for column in table.columns
    ]

    if (
        "Song Title" in columns
        and "Streams" in columns
        and "Daily" in columns
    ):
        spotify_table = table.copy()
        break


if spotify_table is None:
    raise ValueError(
        "Spotify table could not be found."
    )


# %%
# cleaning spotify data

spotify_table = spotify_table[
    [
        "Song Title",
        "Streams",
        "Daily"
    ]
].copy()


spotify_table.columns = [
    "spotify_name",
    "spotify_streams",
    "spotify_daily_streams"
]


spotify_table["spotify_name"] = (
    spotify_table["spotify_name"]
    .astype(str)
    .str.strip()
)


for column in [
    "spotify_streams",
    "spotify_daily_streams"
]:
    spotify_table[column] = (
        spotify_table[column]
        .astype(str)
        .str.replace(
            ",",
            "",
            regex=False
        )
    )

    spotify_table[column] = pd.to_numeric(
        spotify_table[column],
        errors="coerce"
    )


# keeping the main version
spotify_table = (
    spotify_table
    .sort_values(
        "spotify_streams",
        ascending=False
    )
    .drop_duplicates(
        subset="spotify_name",
        keep="first"
    )
)


# %%
# matching spotify titles

df_tracks["spotify_lookup_name"] = (
    df_tracks["track_name"]
    .astype(str)
    .str.strip()
)


df_tracks.loc[
    df_tracks["track_name"]
    == "Roter Sand (Orchester Version)",
    "spotify_lookup_name"
] = "Roter Sand - Orchester Version"


df_tracks = df_tracks.merge(
    spotify_table,
    left_on="spotify_lookup_name",
    right_on="spotify_name",
    how="left"
)


df_tracks = df_tracks.drop(
    columns=["spotify_lookup_name"]
)


df_tracks["spotify_retrieved_at"] = (
    date.today()
)


# %%
# final checks

important_columns = [
    "track_name",
    "lastfm_listeners",
    "lastfm_playcount",
    "spotify_streams",
    "spotify_daily_streams"
]


if len(df_tracks) != 16:
    raise ValueError(
        f"Expected 16 tracks, found {len(df_tracks)}."
    )


if df_tracks["track_name"].duplicated().any():
    raise ValueError(
        "Duplicate track names found."
    )


missing_values = (
    df_tracks[important_columns]
    .isna()
    .sum()
)


print("\nFinal checks:")
print("Shape:", df_tracks.shape)

print(
    "Duplicate tracks:",
    df_tracks["track_name"]
    .duplicated()
    .sum()
)

print("\nMissing important values:")
print(missing_values)


# %%
# saving a new file

project_folder.mkdir(
    parents=True,
    exist_ok=True
)


df_tracks.to_csv(
    new_csv,
    index=False,
    encoding="utf-8-sig"
)


print(
    "\nNew dataset saved to:",
    new_csv
)

print(
    "File size:",
    new_csv.stat().st_size,
    "bytes"
)