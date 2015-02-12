# Python MQTT Connection Example

import paho.mqtt.client as mqtt     # Using the Paho MQTT client
import ssl
import hashlib
import time

# Define some constants.
# Change the username and token to those found in Your Credentials.
USERNAME = '1c022d17-0158-4e05-a385-bcf319c79b51'
TOKEN = 'b3864239-7209-4150-88b7-495a50e90292'
TOKEN_HASH = hashlib.md5(TOKEN).hexdigest()
HOST = 'q.thingfabric.com'
PORT = 1883     # Use port 8883 if you're licensed for SSL
TOPIC = 'a39qbvxd11thkgv/helloworldcrap'
PAYLOAD = '{"Hello":"World!"}'
QOS = 0
CERT_FILE = '/usr/local/etc/openssl/cert.pem'

# Result codes and their explanations for connection failure debugging.
RESULT_CODES = {
    0: 'Connection successful',
    1: 'Incorrect protocol version',
    2: 'Invalid client identifier',
    3: 'Server unavailable',
    4: 'Bad username or password',
    5: 'Not authorized'
}

def on_connect(client, userdata, rc):
    if rc == 0:
        print("Connection successful! (Result code 0)")

        test_publish()
        test_subscribe()

    else:
        print("Connection unsuccessful! (Result code " + str(rc) + ": " + RESULT_CODES[rc] + ")")

        # Stop the loop from trying to connect again if unsuccessful.
        client.disconnect()

# The following are functions bound to callbacks.
def on_disconnect(client, userdata, rc):
    print("Connection has been lost.")

    # This will automatically reconnect if connection is lost.
    print("Attempting to reconnect in 5s.")
    time.sleep(5)    
    client.connect(HOST, PORT)

def on_publish(client, userdata, mid):
    print("Message " + str(mid) + " has been published.")

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscription confirmed.")

def on_unsubscribe(client, userdata, mid):
    print("Unsubscribe confirmed.")

def on_message(client, userdata, message):
    print("Received message on topic " + str(message.topic) + " (QOS " + str(message.qos) + "): " + str(message.payload))

# These functions test the publishing and subscription functionality.
def test_publish():
    print("Publishing to " + TOPIC + " (QOS " + str(QOS) + "): " + PAYLOAD)
    client.publish(TOPIC, PAYLOAD, QOS)

def test_subscribe():
    print("Subscribing to " + TOPIC)
    client.subscribe(TOPIC, QOS)

client = mqtt.Client(client_id="python-mqtt")

# Bind callbacks to the relevant functions.
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_publish = on_publish
client.on_subscribe = on_subscribe
client.on_unsubscribe = on_unsubscribe
client.on_message = on_message

# Set client username and token information.
client.username_pw_set(USERNAME, TOKEN_HASH)

# Set SSL parameters here if you're licensed
# client.tls_set(CERT_FILE, certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1, ciphers=None)

# Establish the connection.
client.connect(HOST, PORT)

# Maintain a connection with the server.
client.loop_forever()
