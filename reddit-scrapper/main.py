import asyncpraw
from datetime import datetime
import asyncio
import nats 

# text protocol 

# joke_msg:{joke fetched from reddit},joke_date:{submission created_utc}
# send on nats 'jokes' topic


async def main():

    # Create nats connection
    nc = await nats.connect("0.0.0.0:4222")
    # create a reddit object to acces praw methods
    reddit = asyncpraw.Reddit(
    client_id="W9GEWCdxVjdP8acSIAbXlA",
    client_secret="XW9-ae1H8pm-oxCByyZ3YiL5wTKFBg",
    user_agent="1768466342510-vYMaZfD3SBDP1Oywdnh7hbcLX4xAqQ",
    )
    # get and listen submissions from the subreddit
    subreddit = await reddit.subreddit("oneliners+jokes")
    async for submission in subreddit.stream.submissions():
        try:
            # create a string following the text protocol
            requestString = "joke_msg:" + submission.title + "\n"+submission.selftext + ",joke_date:" + str(datetime.utcfromtimestamp(submission.created_utc))
            print(requestString)
            #publish on the nats 'jokes' topic
            await nc.publish("jokes", requestString.encode())
        except asyncpraw.exceptions.PRAWException as e:
            pass

    #close nats 
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())