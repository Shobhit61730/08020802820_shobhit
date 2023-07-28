import requests
from flask import Flask, request, jsonify
import asyncio

app = Flask(__name__)

async def fetch_numbers(url):
    try:
        response = await asyncio.wait_for(requests.get(url), timeout=0.5)
        data = response.json()
        if "numbers" in data and isinstance(data["numbers"], list):
            return set(data["numbers"])  # using set to ensure unique numbers;
    except (requests.RequestException, asyncio.TimeoutError):
        pass
    return set()

@app.route('/numbers')
def get_numbers():
    urls = request.args.getlist('url')
    
    # ysing asyncio to fetch URLs concurrently and respect the timeout
    loop = asyncio.get_event_loop()
    tasks = [fetch_numbers(url) for url in urls]
    completed_tasks, _ = loop.run_until_complete(asyncio.wait(tasks, timeout=0.5))
    
    # extract the unique num from completed tasks
    unique_numbers = set()
    for task in completed_tasks:
        unique_numbers.update(task.result())
    
    return jsonify({"numbers": sorted(list(unique_numbers))})

if __name__ == '__main__':
    app.run(port=8008)
