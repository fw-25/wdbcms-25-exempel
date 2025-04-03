import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

PORT=8001

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# if-sats i python
@app.get("/if/{user_input}")
def if_test(user_input: str):
    message = None # None är samma som null i andra språk

    if user_input == "hello" or user_input == "hi": 
        message = user_input + " yourself!" # konkatenering med +
    elif user_input == "goodbye" and 1 > 0:
        message = "bye bye"
    else:
        message = f"I don't understand {user_input}" # f-string
        # jfr JS backtick: `I don't understand ${user_input}`;

    return { "msg": message }

@app.get("/")
def hello():
    msg = "Några populära SOA-implementationer:" # string-variabel
    soa_protocols = [ "SOAP", "REST", "GraphQL", "gRPC" ] # list
    my_dict = { 
        'message': msg, 
        'myList': soa_protocols 
    } # dictionary

    return my_dict

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=PORT,
        ssl_keyfile="/etc/letsencrypt/privkey.pem",
        ssl_certfile="/etc/letsencrypt/fullchain.pem",
    )
