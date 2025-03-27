import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

PORT=8003

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# "List of dicts" i python är ungefär samma som en "array of objects" (i JS)
rooms = [
    { "number": 303, "type": "single", "price": 199.9 },
    { "number": 404, "type": "double", "price": 350.1 },
    { "number": 505, "type": "suite", "price": 500 }
]

@app.get("/rooms")
def getRooms(request: Request):
    return rooms

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=PORT,
        ssl_keyfile="/etc/letsencrypt/privkey.pem",
        ssl_certfile="/etc/letsencrypt/fullchain.pem",
    )
