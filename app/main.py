import asyncio
from threading import Thread
import time
import serial
from websockets.asyncio.server import serve

clients = set()
async def connect(websocket):
    clients.add(websocket)
    print(clients)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)


PORT = "/dev/ttyACM1"


async def listen_for_serial():
    ser = serial.Serial(port = PORT, baudrate = 9600) 
    time.sleep(1.5)
    while True:
        try:
            data = ser.readline().decode().strip()
            if data:
                for websocket in clients:
                    await websocket.send(data)
        except:
            continue


serial_thread = Thread(target=lambda: asyncio.run(listen_for_serial()))
serial_thread.start()


async def main():
    async with serve(connect, "0.0.0.0", 8000) as server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
