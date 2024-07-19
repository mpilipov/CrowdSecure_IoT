'use strict';

const { connect } = require('mqtt');

const server = 'mqtt://Local_MQTT@broker.emqx.io';
const topic = 'user1';
const topic2 = 'user2';
const port = 1883;
const interval = 5000;

// Data simulation
function generateData() {
    return {
        HeartRate: Math.floor(Math.random() * (200 + 1)) + 0, // Heart rate
        Saturation: Math.floor(Math.random() * (100 - 90 + 1)) + 90, // Saturation
        Location: {
            latitude: (Math.random() * (47.092 - 35.492) + 35.492).toFixed(6), // Latitude
            longitude: (Math.random() * (18.521 - 6.627) + 6.627).toFixed(6) // Longitude
        }
    };
}

// Connection to the MQTT broker
const client = connect(server, {
    port: port
});

client.on('connect', () => {
    console.log('Connected to MQTT broker');

    //extraction data from topic user1
    setInterval(() => {
        const data = generateData();
        client.publish(topic, JSON.stringify(data), { qos: 0, retain: false });
        console.log('Data published:', data);
    }, interval);

    //extraction data from topic user2
    setInterval(() => {
        const data = generateData();
        client.publish(topic2, JSON.stringify(data), { qos: 0, retain: false });
        console.log('Data published:', data);
    }, interval);
});

client.on('error', (err) => {
    console.error('Connection error:', err);
    client.end();
});

client.on('close', () => {
    console.log('Connection closed');
});