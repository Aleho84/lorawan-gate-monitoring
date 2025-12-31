<p align="center">
  <a href="" rel="noopener">
 <img width=96px height=96px src="https://cdn-icons-png.flaticon.com/512/15/15924.png" alt="Project logo"></a>
</p>

<h3 align="center">lorawan-gate-monitoring</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?style=plastic)](https://github.com/Aleho84/lorawan-gate-monitoring)
[![GitHub Version](https://img.shields.io/github/package-json/v/aleho84/lorawan-gate-monitoring?style=plastic)](https://github.com/Aleho84/lorawan-gate-monitoring)
[![GitHub Issues](https://img.shields.io/github/issues/aleho84/lorawan-gate-monitoring?style=plastic)](https://github.com/Aleho84/lorawan-gate-monitoring/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/aleho84/lorawan-gate-monitoring?style=plastic)](https://github.com/Aleho84/lorawan-gate-monitoring/commits/main/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](/LICENSE)

</div>

---

<p align="center"> Monitoring of gates through LoraWan devices.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Project Analysis](PROJECT.md)
- [Getting Started](#getting_started)
- [Running the tests](#test)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

This project involves the development of a door monitoring system for compressor plants using Node.js, LoRaWAN devices, and the MQTT network.

### Overview

The system is designed to monitor the status of doors in compressor plants. It uses LoRaWAN devices attached to each door to detect and report their open or closed state. These devices are chosen for their long-range capabilities and low power consumption, making them ideal for this application.

### Node.js Application

The core of the system is a Node.js application. This application receives data from the LoRaWAN devices, processes it, and updates the door status in real-time. Node.js is chosen for its event-driven, non-blocking I/O model, which makes it efficient and lightweight, perfect for handling the data from multiple devices simultaneously.

### MQTT Network

The system uses the MQTT (Message Queuing Telemetry Transport) network protocol for transmitting the data from the LoRaWAN devices to the Node.js application. MQTT is a lightweight messaging protocol designed for low-bandwidth, high-latency networks, making it an excellent choice for this system.

### Benefits

This system provides real-time monitoring of doors in compressor plants, improving security and operational efficiency. It allows for quick response to any unauthorized door openings, and it can also provide valuable data for analyzing usage patterns and optimizing operations.

### Future Work

Future enhancements to this system could include integrating it with an alert system to send notifications when doors are opened, adding more sensors for additional monitoring capabilities, and developing a user-friendly dashboard for easy viewing and analysis of the data.

[PROJECT ANALYSIS](PROJECT.md)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

* **Node.js and npm:** Make sure you have the latest versions installed. If not, download them from [https://nodejs.org/](https://nodejs.org/).
* **A code editor:** Visual Studio Code, Sublime Text, or whatever you prefer. The important thing is that you feel comfortable!

### Installing

1.  **Clone the repository:**
    ```bash 
    git clone https://github.com/Aleho84/lorawan-gate-monitoring.git
    ```

3.  **Install dependencies:** 
    ```bash 
    npm install
    ```

5.  **Configure environment variables:** Create a `.env` file and fill in the necessary data (don't forget the JWT secret!)
    ```bash
    # .env Example
    NODE_ENV='development'
    PROTOCOL='http'
    PORT=80

    DB_MODE='mongo'
    MONGOOSE_URI='mongodb://localhost:27017'

    MQTT_SERVER='192.168.0.1'
    MQTT_USER='mqtt_user'
    MQTT_PASS='mqtt_user_password'
    MQTT_PORT=1883
    MQTT_TOPIC='example/#'
    MQTT_SENDER='mqtt_sender'

    MAIL_FROM='lorawan-gate-monitoring@mail.com'
    MAIL_TO='user1@mail.com; user2@mail.com'   

    MAIL_HOST='smtp.gmail.com'
    MAIL_PORT=465
    MAIL_SECURE=true
    MAIL_IGNORETLS=false
    MAIL_USER='google_account@gmail.com'
    MAIL_PASS='google_account_password'
    ```

6.  **Start the server:** 
    ```bash
    npm start
    ```

8.  **Open http://localhost:80 in the browser and enjoy!** 🎉

## 🔧 Running the tests <a name = "tests"></a>

    ```bash
    npm run test
    ```

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [MongoDB](https://www.mongodb.com/) - Database

## ✍️ Authors <a name = "authors"></a>

- [@aleho84](https://github.com/aleho84) - Idea & Initial work
