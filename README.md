# KafkaJS with Docker + Zookeeper

This project demonstrates how to run Apache Kafka and Zookeeper using Docker Compose, and interact with Kafka using a Node.js app via [KafkaJS](https://kafka.js.org/).

---

## 🚀 Prerequisites

- Docker & Docker Compose installed
- Node.js v18+ installed (for running KafkaJS scripts outside Docker)
- Local network IP address (for Kafka advertised listener)

---

## 🔧 Step 1: Update Your Private IP in `docker-compose.yaml`

In the `kafka` service section of your `docker-compose.yaml`, replace `<YOUR_PRIVATE_IP>` with your local machine’s IP address (not `localhost`):

```yaml
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://<YOUR_PRIVATE_IP>:9092
