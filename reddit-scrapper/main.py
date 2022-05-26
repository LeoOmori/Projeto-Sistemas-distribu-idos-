import praw
from datetime import datetime

reddit = praw.Reddit(
    client_id="W9GEWCdxVjdP8acSIAbXlA",
    client_secret="XW9-ae1H8pm-oxCByyZ3YiL5wTKFBg",
    user_agent="1768466342510-vYMaZfD3SBDP1Oywdnh7hbcLX4xAqQ",
)

subreddit = reddit.subreddit("oneliners")

for submission in subreddit.hot(limit=10):
    print(datetime.utcfromtimestamp(submission.created_utc))