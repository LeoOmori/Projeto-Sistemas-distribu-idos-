"""
    25/06/2022
    Autores: Leonardo,Luan
    Script feito para escutar os subreddits /onelines e /jokers, mandando as piadas capturadas para o tópico 
    'jokes' no servidor nats
"""

from time import sleep
import asyncpraw
import os
from datetime import datetime
import asyncio
import nats 
from dotenv import load_dotenv

# text protocol 
# TITLE &/ TEXT &/ DATE &/ ID
# send on nats 'jokes' topic

async def main():

    #Load dotenv
    load_dotenv()

    #get env variables
    CLIENT_ID = os.getenv('CLIENT_ID')
    CLIENT_SECRET = os.getenv('CLIENT_SECRET')

    # Create nats connection    
    nc = await nats.connect("0.0.0.0:4222")
    # create a reddit object to acces praw methods
    reddit = asyncpraw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    user_agent="",
    )
    # get and listen submissions from the subreddit
    subreddit = await reddit.subreddit("oneliners+jokes")
    async for submission in subreddit.stream.submissions():
        try:
            # create a string following the text protocol
            requestString = submission.title + "&/"+submission.selftext + "&/" + str(datetime.utcfromtimestamp(submission.created_utc)) + "&/" + submission.id
            print(requestString)
            #publish on the nats 'jokes' topic
            await nc.publish("jokes", requestString.encode())
        except asyncpraw.exceptions.PRAWException as e:
            pass

    #close nats 
    await nc.close()

if __name__ == '__main__':
    asyncio.run(main())
