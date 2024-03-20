<p align="center">
  <a href="" rel="noopener">
 <img width=96px height=96px src="https://cdn-icons-png.flaticon.com/512/15/15924.png" alt="Project logo"></a>
</p>

<h3 align="center">lorawan-gate-monitoring</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg?style=plastic)](https://github.com/Aleho84/tranqueras-mqtt)
[![GitHub Version](https://img.shields.io/github/package-json/v/aleho84/tranqueras-mqtt?style=plastic)](https://github.com/Aleho84/tranqueras-mqtt)
[![GitHub Issues](https://img.shields.io/github/issues/aleho84/tranqueras-mqtt?style=plastic)](https://github.com/Aleho84/tranqueras-mqtt/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/aleho84/tranqueras-mqtt?style=plastic)](https://github.com/Aleho84/tranqueras-mqtt/commits/main/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](/LICENSE)

</div>

---

<p align="center"> Monitoring of gates through LoraWan devices.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

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

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [VueJs](https://vuejs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@aleho84](https://github.com/aleho84) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- Inspiration
- References
