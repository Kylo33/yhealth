from fastapi import FastAPI, WebSocket
import asyncio
from datetime import datetime

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    start = datetime.now()
    for _ in range(200):
        await asyncio.sleep(.05)
        await websocket.send_text("11111")
    end = datetime.now()
    print(end - start)
